'use strict';

const Controller = require('egg').Controller;
const { readFileSync } = require('fs');
const { join } = require('path');

class HomeController extends Controller {
  async test() {
  	const { ctx } = this;
		const { _ } = ctx;
    ctx.body = {
    	now: _.now(),
    	message: ctx.query,
			params: ctx.params,
			auth: false
    };
  }

  async defaults() {
		const { ctx } = this;
		ctx.status = 200;
		ctx.html = readFileSync(join(__dirname, '../../dist/index.html')).toString();
  	// ctx.body = { msg: 'hello, world!' };
  }

}

module.exports = HomeController;
