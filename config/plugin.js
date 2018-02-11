'use strict';

const { join } = require('path');


exports.utils = {
	enable: true,
	path: join(__dirname, '../lib/plugin/egg-utils'),
};

exports.mysql = {
	enable: true,
	package: 'egg-mysql',
};

exports.validate = {
	enable: true,
	package: 'egg-validate'
};
