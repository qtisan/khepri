'use strict';

const { Controller } = require('egg');

class MenuController extends Controller {

    async getMenusByRole() {
        const { ctx } = this;
        await ctx.service.passport.local.deserializeUser();
        const { user } = ctx.state;
        ctx.ass(user, 1998);
        const { authority } = user;
        const menus = await this.service.preset.menu.getMenus(authority);
        ctx.data(menus);
    }

    async getMenus() {
        const { ctx } = this;
        await ctx.service.passport.local.deserializeUser();
        const { user } = ctx.state;
        ctx.ass(user, 1998);
        const menus = await this.service.preset.menu.getMenus();
        ctx.data(menus);
    }

}

module.exports = MenuController;