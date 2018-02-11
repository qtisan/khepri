'use strict';

const { Controller } = require('egg');
const qs = require('querystring');

class PassportController extends Controller {

    async login() {
        const { ctx } = this;
        const { username, password, remember, type } = ctx.request.body;
        const { local } = ctx.service.passport;
        await local.login({ username, password, remember });
        await local.deserializeUser();
        const { user } = ctx.state;
        ctx.data({
            type, ...user // TODO: should filter the user field to client.
        });
    }

    async logout() {
        const { ctx } = this;
        ctx.service.passport.local.logout();
        ctx.data({ action: 'logout' });
    }

}

module.exports = PassportController;