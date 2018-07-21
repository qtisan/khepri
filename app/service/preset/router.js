'use strict';

const Service = require('egg').Service;
const { attach, getObject } = require('../../../lib/utils/system');

class RouterService extends Service {

    async getRouters(role) {
        const { db } = this.service;
        const adminRoleId = this.app.config.adminRoleId;
        const { rows } = role ?
            await db.proc('sys_get_routers_by_role', role) :
            await db.proc('sys_get_routers');
        const routers = rows.map(r => ({
            router_name: r.router_name,
            router_path: r.router_path,
            component_path: r.component_path,
            ref_models: getObject(r.ref_models),
            authority: attach(r.authority, adminRoleId),
        }));
        return routers;
    }

}

module.exports = RouterService;
