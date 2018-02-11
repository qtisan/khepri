'use strict';

const { Controller } = require('egg');

class MenuController extends Controller {

    async getMenusByRole() {
        const { ctx } = this;
        const { user } = ctx.state;
        ctx.ass(user, 1998);
        const { authority } = user;
        const menus = await this.service.preset.menu.getMenusByRole(authority);
        ctx.data(menus);
    }

}

module.exports = MenuController;