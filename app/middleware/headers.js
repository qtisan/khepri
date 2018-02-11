'use strict';

module.exports = options => {
    return async function setCharset(ctx, next) {
        await next();
        ctx.type = options.type;
    };
};