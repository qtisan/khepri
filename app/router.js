'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/test', controller.home.index);
  router.resources('data', '/data/:table', controller.data);
};
