module.exports = options => {
    return async function respf(ctx, next) {
        await next();
        ctx.locals.isHTML || (() => {
            ctx.body = {
                success: true,
                message: 'request successful!',
                timestamp: new Date().getTime(),
                data: ctx.body
            };
        })();
        ctx.error && Object.assign(ctx.body, {
            error: ctx.error,
            success: false
        });
    };
};