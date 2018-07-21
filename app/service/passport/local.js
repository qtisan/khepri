'use strict';

const Service = require('egg').Service;
const { parse } = require('querystring');

class LocalService extends Service {

    async isAuthenticated() {
        const { ctx } = this;
        ctx.ass(ctx.session.user_id, 1099);
        await this.deserializeUser();
        return true;
    }

    async login(params) {
        const { ctx } = this;
        ctx.ass(!ctx.session.user_id, 1995);
        const { decryptQuery } = this.app.utils;
        let { username, password, remember } = params;
        let loginQuery = parse(decryptQuery(password));
        password = loginQuery.password;
        ctx.ass(username === loginQuery.username, 1998);
        ctx.ass(username && password, 1901);
        const user = await this.authenticate(username, password);
        ctx.ass(user, 1009);
        if (remember) {
            ctx.session.maxAge = 30 * 24 * 3600 * 1000;
        }
        return await this.serializeUser(user);
    }

    async logout() {
        const { ctx } = this;
        ctx.session.user_id = null;
        ctx.state.user = null;
    }

    async authenticate(username, password) {
        const { db } = this.service;
        return await db.get('user_auth', {
            identifier: username, 
            credential: password,
            // TODO: local passport provider id
            auth_provider: 'dugkwwl5_ubr9uw7tg7'
        });
    }

    async serializeUser(user) {
        this.ctx.session.user_id = user.user_id;
        return user;
    }

    async deserializeUser() {
        const { ctx } = this;
        const { db } = this.service;
        const user_id = ctx.session.user_id;
        ctx.state.user = await db.procOne('sys_get_user_with_roles', user_id);
        ctx.ass(ctx.state.user && ctx.state.user.user_id, 1007);
    }

}

module.exports = LocalService;