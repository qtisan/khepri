'use strict';

module.exports = options => {
    return async function setCharset(ctx, next) {
        await next();
        ctx.type = ctx._html ? 'text/html; charset=utf-8' :
            'application/json; charset=utf-8';
    };
};