'use strict';

const Service = require('egg').Service;


class MenuService extends Service {

    async getMenusByRole(role) {
        const { db } = this.service;
        const { treeBuilder } = this.app.utils;
        const { rows } = await db.proc('sys_get_menus_by_role', role);
        const toTree = treeBuilder({ id: 'menu_id', parent: 'parent_id' });
        return toTree(rows);
    }

}

module.exports = MenuService;