'use strict';

const { Controller } = require('egg');

class RouterController extends Controller {

    async getRouters() {
        const { ctx } = this;
        await ctx.service.passport.local.deserializeUser();
        const { user } = ctx.state;
        ctx.ass(user, 1998);
        const routers = await this.service.preset.router.getRouters();
        ctx.data(routers);
    }

}

module.exports = RouterController;