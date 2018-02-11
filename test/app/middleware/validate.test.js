'use strict';


const { app, assert } = require('egg-mock/bootstrap');
const { khepri } = require('../../fixture/data').users;

describe('test/middleware/validate.test.js', () => {

    // it('should pass the validation.', async () => {

    //     app.mockCsrf();
    //     const ctx = app.mockContext();
    //     const result = await app.httpRequest()
    //         .post('/passport/local/login')
    //         .send({
    //             username: khepri.username,
    //             password: khepri.encryptPassowrd,
    //             type: 'account',
    //             remember: false
    //         });
    //     const data = result.body.data;
    //     assert(result.status, 200);
    //     assert(data.type, 'account');
    //     assert(data.id_card_no, '320103198808309314');

    // });


});
