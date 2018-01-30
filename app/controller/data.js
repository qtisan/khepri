'use strict';

const Controller = require('egg').Controller;

class DataController extends Controller {

	// `/table`
	async index() {
		const { ctx, app } = this;
		const { mysql, utils } = app;
		const user = await mysql.get('user_info', { user_id: '4bf979f6023a11e8b9b8005056c00001' });
		ctx.body = {
			params: ctx.params,
			query: ctx.query,
			user: user,
			time: utils.now(),
			is_cn_new_id: utils.isCnNewID('330382198608110018')
		};
	}

	async show() {
		const { ctx } = this;
		ctx.body = ctx.params;
	}

	async edit() {

	}

	async create() {

	}

	async update() {

	}

	async destroy() {

	}

}

module.exports = DataController;