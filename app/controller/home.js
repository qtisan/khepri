'use strict';

const Controller = require('egg').Controller;
const { readFileSync } = require('fs');
const { join } = require('path');

class HomeController extends Controller {
  async index() {
  	const { ctx } = this;

    ctx.body = {
    	is: ctx.isIOS,
    	message: ctx.query,
	    params: ctx.params
    };
  }

  async defaults() {
  	const { ctx } = this;
  	const html = readFileSync(join(__dirname, '../../dist/index.html')).toString();
  	ctx.locals.isHTML = true;
  	ctx.body = html;
  }

  async error404() {
  	const { ctx } = this;
  	ctx.error = {
  		status: 404,
  		message: this.app.config.errorMessage['404']
  	}
  }

}

module.exports = HomeController;
