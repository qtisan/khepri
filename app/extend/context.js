
const DATA = Symbol('Context#data');
const ERROR = Symbol('Context#error');
const getError = require('../../lib/error');

module.exports = {

    _getData() {
        if (!this[DATA]) {
            this[DATA] = {
                status: 'ok',
                message: 'success',
                timestamp: new Date().getTime(),
                data: {}
            };
        }
        return this[DATA];
    },

    data(content) {
        const d = this._getData();
        d.data = content;
    },

    get body() {
        return this._getData();
    },

    set body(v) {
        const d = this._getData();
        const j = this.app.utils.parseJSON(v);
        if (j) {
            this[DATA] = v;
        }
        else {
            d.data = v;
        }
    },

    get error() {
        if (!this[ERROR]) {
            return null;
        }
        return this[ERROR];
    },

    stat(error, code) {
        const d = this._getData();
        if (typeof error === 'string') {
            d.status = 'error';
            d.code = code || 5000;
            d.message = error;
            this[ERROR] = new Error(error, code);
        }
        else if (error instanceof Error) {
            d.status = error.status || 'error';
            d.code = code || error.code || 5000;
            d.message = error.message;
            this[ERROR] = error;
        }
        else if (typeof error === 'number') {
            const err = getError(error);
            d.status = err.status;
            d.code = err.code;
            d.message = err.message;
            d.data = code;
        }
    },

    err(error, code) {
        const d = this._getData();
        this.stat(error, code);
        this.throw(d.code, d.message);
    },

    ass(a, error, code) {
        if (!a) {
            this.err(error, code);
        }
    }

};