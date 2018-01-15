'use strict';

const path = require('path');


exports.restful = {
	enable: true,
	path: path.join(__dirname, '../lib/plugin/egg-restful'),
};

exports.logrotator = {
	enable: true,
	package: 'egg-logrotator',
};
