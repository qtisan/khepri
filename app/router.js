'use strict';

const ALL_METHOD = [
	'GET', 'POST', 'PUT', 'DELETE', 
	'HEAD', 'TRACE', 'OPTIONS', 'LOCK', 
	'MKCOL', 'MOVE', 'CONNECT'
];

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.defaults);
  router.get('/test', controller.home.index);
  
  router.resources('data', '/data/:table', controller.data);

  router.post('/auth/login', controller.auth.login);

  router.register('*', ALL_METHOD, controller.home.error404);
};
