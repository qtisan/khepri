'use strict';

const { parse } = require('qs');
const ss = require('./sqlstring');

const DEEP_START_REG = /\(/g,
    DEEP_END_REG = /\)/g,
    SEPARATOR = ',';
const OP_TABLE = {
    eq: '=',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
    neq: '<>',
    like: ' LIKE ',
    in: ' IN ',
    is: ' IS ',
    not: ' IS NOT ',
    btw: {
        temp: ' BETWEEN ? AND ?',
        valueToParams: v => v.split('|')
    }
};

class SqlQuery {

    constructor(f) {
        this.so = parse(f.replace(/\s/g, ''));
        ['fields', 'from', 'where', 'order', 'limit'].forEach(
            k => { this[k] = { temp: [], params: [] }; }
        );
        this._tableIndex = -1;
        this._tableList = [];
    }

    static append(prop, sql, ...params) {
        prop.temp.push(sql);
        prop.params = prop.params.concat(params);
        return true;
    }
    static judgeDeep(f) {
        let inDeep = 0, selfClose = false;
        inDeep += f.match(DEEP_START_REG) ? f.match(DEEP_START_REG).length : 0;
        selfClose = inDeep;
        inDeep -= f.match(DEEP_END_REG) ? f.match(DEEP_END_REG).length : 0;
        const mode = inDeep > 0 ? 'deep_in' :
            (inDeep < 0 ? 'deep_out' : (selfClose ? 'self_close' : 'flat'));
        return {
            mode, level: mode == 'self_close' ? selfClose : Math.abs(inDeep)
        };
    }

    _findTableAlias(table, index) {
        let i = index, alias;
        for (let tb of this._tableList) {
            alias = tb.alias;
            if (!!--i) {
                break;
            }
        }
        return alias;
    }
    _genTable(tb, pk, fk, host) {
        const { append } = SqlQuery;
        let alias = this._genAlias(), table = tb;
        const ta = tb.match(/^([0-9A-Z_]+)\.(\d+)$/i);
        if (ta) {
            table = ta[1];
            alias = `c${ta[2]}`;
        }
        this._tableIndex && append(this.from, 'LEFT JOIN ?? ?? ON ??.??=??.??',
            table, alias, alias, pk, host, fk) || append(this.from, '?? ??', table, alias);
        const _table = { table, alias, pk, fk, host };
        this._tableList.push(_table);
        return _table;
    }
    _genAlias() {
        return `t${++this._tableIndex}`;
    }
    _genCustomerAlias(index) {
        return `c${index}`;
    }
    _pushTableStack(ob, st) {
        let [fk, tb, al, pk] = ob.slice(1);
        pk = pk || fk;
        tb = al ? `${tb}.${al}` : tb;
        st.push(
            this._genTable(tb, pk, fk, st[st.length - 1].alias)
        );
    }
    _parseString(str, options) {
        const opts = {
            reg: /^no_match$/i,
            handler: el => { },
            pushStack: (ob, level) => { },
            popStack: (ob, level) => { },
            ...options
        };
        const { reg, handler, pushStack, popStack } = opts;
        const { judgeDeep } = SqlQuery;
        for (let s of str.split(SEPARATOR)) {
            let strSub = s, ob = strSub.match(reg),
                { mode, level } = judgeDeep(strSub),
                obTimes = level;
            switch (mode) {
                case 'deep_in':
                    while (level-- && ob) {
                        strSub = strSub.substring(ob[0].length, strSub.length);
                        pushStack.call(this, ob, level + 1);
                        ob = strSub.match(reg);
                    }
                    this._parseString(strSub, opts);
                    break;
                case 'deep_out':
                    while (level--) {
                        strSub = strSub.substr(0, strSub.length - 1);
                    }
                    this._parseString(strSub, opts);
                    while (obTimes--) {
                        popStack.call(this, ob, obTimes + 1);
                    }
                    break;
                case 'self_close':
                    while (level--) {
                        strSub = strSub.substring(ob[0].length, strSub.length - 1);
                        pushStack.call(this, ob, level + 1);
                        ob = strSub.match(reg);
                    }
                    handler.call(this, strSub);
                    while (obTimes--) {
                        popStack.call(this, ob, obTimes + 1);
                    }
                    break;
                case 'flat':
                    handler.call(this, strSub);
                    break;
                default:
                    break;
            }
        }
    }
    _parseCondition(str) {
        let [field, op, value] = str.split('.'), index = 0, alias,
            sql = '??', params = [field];
        const fd = field.match(/([0-9A-Z_]+)\[(\d+)\]/i);
        if (fd) {
            [field, index] = fd.slice(1);
            alias = this._genCustomerAlias(index);
            sql = '??.??';
            params = [alias, field];
        }
        op = OP_TABLE[op];
        if (typeof op === 'string') {
            op = {
                temp: `${op}?`, valueToParams: v => [
                    v === 'null' ? null : (
                        v.toUpperCase() === 'TRUE' ? true :
                            (v.toUpperCase() === 'FALSE' ? false : v.replace(/\*/g, '%')))
                ]
            }
        }
        sql = sql + op.temp;
        params = params.concat(op.valueToParams(value));
        return { sql, params };
    }
    _parseField(f) {
        let fa = f.match(/^([0-9A-Z_]+)\[(\d+)\]$/i),
            sql = '??', params = [f];
        if (fa) {
            sql = '??.??';
            params = [this._genCustomerAlias(fa[2]), fa[1]];
        }
        return { sql, params };
    }

    build() {
        const { table } = this.so;
        if (!table) {
            throw new Error('need a given table name.');
        }
        const join = (prop, sep) => prop.temp.join(sep);
        this.buildSelect();
        this.buildWhere();
        this.buildOrder();
        this.buildLimit();
        let sql = `SELECT ${join(this.fields, ', ')} ` +
            `FROM ${join(this.from, ' ')} ` +
            `WHERE ${join(this.where, '')} ` +
            `ORDER BY ${join(this.order, ', ')} ` +
            `LIMIT ${join(this.limit, ', ')}`;
        let params = this.fields.params
            .concat(this.from.params)
            .concat(this.where.params)
            .concat(this.order.params)
            .concat(this.limit.params);
        return ss.format(sql, params);
    }

    buildSelect() {
        const { append } = SqlQuery;
        const { table, field } = this.so;
        const _main_table = this._genTable(table);
        const appendField = (...params) => {
            let asId = params[1].indexOf('.'), tmp = '??.??';
            params[0] = params[0].alias;
            if (asId !== -1) {
                params[2] = params[1].substr(asId + 1);
                params[1] = params[1].substr(0, asId);
                tmp = '??.?? ??';
            }
            return append(this.fields, tmp, ...params);
        }
        if (!field) {
            appendField(_main_table, '*');
        }
        else {
            let tableStack = [_main_table];
            this._parseString(field, {
                reg: /^([0-9A-Z_]+)\[([0-9A-Z_]+)\.?(\d*)\.?([0-9A-Z_]*)\]\(/i,
                handler: el => appendField(tableStack[tableStack.length - 1], el),
                pushStack: ob => this._pushTableStack(ob, tableStack),
                popStack: ob => tableStack.pop(),
            });
        }
        return this.fields;
    }

    buildWhere() {
        const { append } = SqlQuery;
        const { where } = this.so;
        if (!where) {
            append(this.where, '?=?', 1, 1);
        }
        else {
            let operatorStack = [];
            this._parseString(where, {
                reg: /^and\(|or\(/i,
                handler: el => {
                    const { sql, params } = this._parseCondition(el);
                    const last = operatorStack[operatorStack.length - 1];
                    last.sql.push(sql);
                    last.params = last.params.concat(params);
                },
                pushStack: ob => {
                    operatorStack.push({
                        op: ob[0].substr(0, ob[0].length - 1).toUpperCase(),
                        sql: [],
                        params: []
                    });
                },
                popStack: ob => {
                    const last = operatorStack[operatorStack.length - 1],
                        pre = operatorStack[operatorStack.length - 2];
                    let sql = `(${last.sql.join(' ' + last.op + ' ')})`,
                        params = last.params;
                    if (pre) {
                        pre.sql.push(sql);
                        pre.params = pre.params.concat(params);
                    }
                    else {
                        append(this.where, sql, ...params);
                    }
                    operatorStack.pop();
                },
            });
        }
        return this.where;
    }

    buildOrder() {
        const { append } = SqlQuery;
        const { order } = this.so;
        if (!order) {
            append(this.order, '?', 1);
        }
        else {
            this._parseString(order, {
                handler: el => {
                    let [field, sc] = el.split('.');
                    let { sql, params } = this._parseField(field);
                    append(this.order, `${sql} ${sc.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`, ...params);
                }
            });
        }
        return this.order;
    }

    buildLimit() {
        const { append } = SqlQuery;
        const { limit } = this.so;
        append(this.limit, '?,?', ...limit.split(',').map(Number));
        return this.limit;
    }

}


module.exports = SqlQuery;

