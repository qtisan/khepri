

module.exports = options => {
	return async function respf(ctx, next) {
		await next();
		ctx.body = {
			success: true,
			message: 'success',
			time: new Date(),
			data: ctx.body
		};

	};
};