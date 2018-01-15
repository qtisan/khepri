'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
  	const { ctx } = this;

    ctx.body = {
    	is: ctx.isIOS,
    	message: ctx.query,
	    params: ctx.params
    };
  }
}

module.exports = HomeController;
