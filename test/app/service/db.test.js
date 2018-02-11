'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/db.test.js', () => {

    before(async () => {
        this.db = app.mockContext().service.db;
        return app.ready();
    });

    it('should get the user.', async () => {

        const user = await this.db.get('user_info', { user_id: 'dugbpxm9yexhter83ee' });
        assert(user.username === 'khepri');

    });

    it('should get user data with its roles.', async () => {

        const user = await this.db.procOne('sys_get_user_with_roles', 'dugbpxm9yexhter83ee');
        assert(user.authority === 'du856thfk3fto95_mnf,dugkarn8vzmr9djej9e');

    });

    it('should get menu rows.', async () => {

        const res = await this.db.proc('sys_get_menus');
        assert(res.rows.length > 1);

    });


});