'use strict';

module.exports = (options, app) => {
    return async function authenticate(ctx, next) {
        if (!await ctx.service.passport.local.isAuthenticated()) {
            ctx.err(1009);
        }
        await next();
    };
};