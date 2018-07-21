'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { khepri } = require('../../../fixture/data').users;


describe('test/app/controller/passport/local.test.js', () => {

    it('should the user login successful.', async () => {
        app.mockCsrf();
        const ctx = app.mockContext();
        const result = await app.httpRequest()
            .post('/passport/local/login')
            .send({
                username: khepri.username,
                password: khepri.encryptPassowrd,
                type: 'account',
                remember: false
            });
        const data = result.body.data;
        assert(result.status === 200);
        assert(data.type === 'account');
        assert(data.id_card_no === khepri.id_card_no);
        console.log(data);
    });

    it('should the error account or password message.', async () => {
        app.mockCsrf();
        const ctx = app.mockContext();
        const result = await app.httpRequest()
            .post('/passport/local/login')
            .send({
                username: khepri.errorUsername,
                password: khepri.errorEncryptPassowrd,
                type: 'account',
                remember: false
            });
        console.log(result.body);
        assert(result.body);
        // const data = result.body.data;
        // assert(result.status === 200);
        // assert(data.status === 'error');
        // assert(data.code === 1009);
    });


    it('should logout, clear session & remove state.user.', async () => {
        app.mockCsrf();
        const ctx = app.mockContext({
            session: { user_id: khepri.user_id },
            state: { user: khepri }
        });
        const result = await app.httpRequest()
            .post('/passport/local/logout');
        const data = result.body.data;
        assert(result.status === 200);
        assert(data.action === 'logout');
        assert(!ctx.session.user_id);
        assert(!ctx.state.user);
    });



});