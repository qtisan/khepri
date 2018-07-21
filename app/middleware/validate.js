'use strict';

module.exports = rule => {

    return async function validate(ctx, next) {
        ctx.validate(rule);
        await next();
    }

};