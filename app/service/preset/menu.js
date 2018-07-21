'use strict';

const Service = require('egg').Service;
const {attach} = require('../../../lib/utils/system');

class MenuService extends Service {

    async getMenus(role) {
        const { db } = this.service;
        const { treeBuilder } = this.app.utils;
        const adminRoleId = this.app.config.adminRoleId;
        const { rows } = role ? 
            await db.proc('sys_get_menus_by_role', role) :
            await db.proc('sys_get_menus');
        const menus = rows.map(r => ({
            name: r.menu_name,
            icon: r.menu_icon,
            authority: attach(r.authority, adminRoleId),
            path: r.menu_code,
            menu_id: r.menu_id,
            parent_id: r.parent_id
        }));
        const toTree = treeBuilder({ id: 'menu_id', parent: 'parent_id' });
        return toTree(menus);
    }

}

module.exports = MenuService;
