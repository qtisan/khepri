'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { khepri } = require('../../../fixture/data').users;


describe('test/app/controller/preset/menu.test.js', () => {

    it('should fetch the menus of user with role.', async () => {

        app.mockCsrf();
        const ctx = app.mockContext({
            state: { user: khepri }
        });
        const result = await app.httpRequest()
            .post('/preset/menu/get-menus-by-role')
            .send(khepri);
        const menus = result.body.data;
        assert(menus
            .find(m1 => m1.menu_id == 'post').children
            .find(m2 => m2.menu_id == 'post-meeting').children
            .find(m3 => m3.menu_id == 'post-meeting-sponsor').sequence == 88800);
    });

});
