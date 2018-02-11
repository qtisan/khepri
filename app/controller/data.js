'use strict';

const Controller = require('egg').Controller;

class DataController extends Controller {

	// `/table`
	async index() {
		const { ctx, app } = this;
		const { mysql, utils } = app;
		ctx.body = {
			params: ctx.params,
			query: ctx.query,
			time: utils.now(),
			chn: '你好，世界！'
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