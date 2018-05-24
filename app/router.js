'use strict';

const { Controller } = require('egg');
const { join } = require('path');

module.exports = app => {
  const { router, controller, utils } = app;
  const authenticate = app.middleware.authenticate();
  const validate = app.middleware.validate;

  const routes = {
    'GET /': 
      [controller.home.defaults],
    'GET /test': 
      [authenticate, controller.home.test],
    // 'post /passport/local/login':
    //   [validate({ password: 'encrypt' }), controller.passport.local.login],
    'POST /passport/local/login':
      [controller.passport.local.login],
    'POST /passport/local/logout':
      [controller.passport.local.logout],
    'POST /passport/local/current':
      [controller.passport.local.current],
    'POST /preset/menu/get-menus-by-role': 
      [controller.preset.menu.getMenusByRole],
    'ALL /data/:table': 
      controller.data.index
  };

  for (let [r, m] of Object.entries(routes)) {
    let [ method, path ] = r.split(' ');
    let middlewares = m instanceof Array ? m : [m];
    method = method.toLowerCase();
    router[method](path, ...middlewares);
    console.log(`[mount route] ${method} ${path}`);
  }
  
};
