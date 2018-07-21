
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/preset/menu.test.js', () => {

    it('should build the menu tree', async () => {
        const ctx = app.mockContext();
        const menus = await ctx.service.preset.menu.getMenusByRole('du856thfk3fto95_mnf');
        assert(menus
            .find(m1 => m1.menu_id == 'system').children
            .find(m2 => m2.menu_id == 'system-param').children
            .find(m3 => m3.menu_id == 'system-param-level').sequence == 25700);
    });

});