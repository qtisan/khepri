'use strict';

const Controller = require('egg').Controller;

const s = {
	table: `sys_menu`,
	subTables: [
		{ table: '', alias: '', pk: '', fk: '' }
	],
	fields: ['menu_id', 'menu_name'],
	limit: [1, 10],
	order: ['parent_id', 'desc', 'sequence', 'desc'],
	query: [
		'menu_id', 'like', 'home%'
	]
};
const sql = 'SELECT ?? FROM ?? WHERE ?? like ? LIMIT ?';
const param = [s.fields, s.table, s.query[0], s.query[2], s.limit];

class DataController extends Controller {

	// `/table`
	async index() {
		const { ctx, app } = this;
		const { mysql, utils } = app;
		ctx.body = {
			params: ctx.params,
			query: ctx.query,
			sql: mysql.format(sql, param),
			result: await mysql.query(sql, param),
			time: utils.now()
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