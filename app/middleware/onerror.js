'use strict';

module.exports = (options, app) => {
    return async function onerror(ctx, next) {
        try {
            await next();
        }
        catch (err) {
            ctx.status = 200;
            ctx.type = 'application/json; charset=utf-8';
            if (ctx.status === 422) {
                ctx.throw(err);
            }
        }
    };
};