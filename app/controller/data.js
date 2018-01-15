'use strict';

const Controller = require('egg').Controller;

class DataController extends Controller {

	// `/table`
	async index() {
		const { ctx } = this;
		ctx.body = {
			params: ctx.params,
			query: ctx.query
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