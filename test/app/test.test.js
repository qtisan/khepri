
'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { khepri } = require('../fixture/data').users;


describe('test/app/test.test.js', () => {

    // it('should not be 404, and customer error 1007', async () => {
    //     app.mockCsrf();
    //     const ctx = app.mockContext({
    //         session: { user_id: '123' }
    //     });
    //     const result = await app.httpRequest()
    //         .get('/test')
    //         .send({
    //             username: khepri.username,
    //             password: khepri.encryptPassowrd,
    //             type: 'account',
    //             remember: false
    //         })
    //         .expect(200);

    //     assert(result.body.status == 'error');
    //     assert(result.body.code == 1007);
    // });
});

