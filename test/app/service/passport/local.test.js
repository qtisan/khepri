'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { khepri } = require('../../../fixture/data').users;


describe('test/app/service/passport/local.test.js', () => {

    it('should pass the authenticate.', async () => {
        const ctx = app.mockContext();
        const user = await ctx.service.passport.local.authenticate('khepri', '5f4dcc3b5aa765d61d8327deb882cf99');
        assert(user.nickname === '盛贾崇');
    });

    it('should deserialize user to ctx.state.user.', async () => {
        const ctx = app.mockContext({ session: { user_id: 'du88ethb8yptnl75x9w' } });
        const { local } = ctx.service.passport;
        const { state } = ctx;
        await local.deserializeUser();
        assert(state.user.authority);
    });

    it('should login be successful.', async () => {
        const ctx = app.mockContext();
        const { local } = ctx.service.passport;
        const { session } = ctx;
        await local.login({
            username: khepri.username,
            password: khepri.encryptPassowrd,
            remember: false
        });
        assert(session.user_id === khepri.user_id);

    });

});