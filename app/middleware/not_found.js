'use strict';

module.exports = () => {
    return async function notFound(ctx, next) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.err(404)
            } else {
                ctx.status = 200;
                ctx.body = '<h1>Page Not Found</h1>';
            }
        }
        else if (ctx.body) {
            ctx.status = 200;
        }
    }
};