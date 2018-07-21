const Service = require('egg').Service;

class DatabaseService extends Service {

    async get(...params) {
        const { mysql } = this.app;
        return await mysql.get(...params);
    }

    async select(...params) {
        const { mysql } = this.app;
        return await mysql.select(...params);
    }

    async proc(procedure, ...params) {
        const { mysql } = this.app;
        let temp = [];
        for (let i = 0; i < params.length; i ++) {
            temp.push('?');
        }
        let sql = `CALL ${procedure}(${temp.join()});`;
        const [rows, result] = await mysql.query(sql, params);
        return { rows, result };
    }

    async procOne(procedure, ...params) {
        const { rows } = await this.proc(procedure, ...params);
        return rows && rows[0];
    }

    async query(queryString) {
        const { mysql, utils: { parseQueryString } } = this.app;
        const [rows, result] = await mysql.query(parseQueryString(queryString));
        return { rows, result };
    }

    async queryEncrypt(queryCode) {
        const { decryptQuery } = this.app.utils;
        return query(decryptQuery(queryCode));
    }

}

module.exports = DatabaseService;