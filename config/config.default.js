'use strict';

const { join } = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515815284088_5931';

  // add your config here
  config.middleware = [ 'respf' ];
  config.respf = {};

  config.logrotator = {
	  filesRotateByHour: [],           // list of files that will be rotated by hour
	  hourDelimiter: '-',              // rotate the file by hour use specified delimiter
	  filesRotateBySize: [],           // list of files that will be rotated by size
	  maxFileSize: 50 * 1024 * 1024,   // Max file size to judge if any file need rotate
	  maxFiles: 10,                    // pieces rotate by size
	  rotateDuration: 60000,           // time interval to judge if any file need rotate
	  maxDays: 31,                     // keep max days log files, default is `31`. Set `0` to keep all logs
  };

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'toashintel',
      database: 'khepri_db'
    },
    app: true,
    agent: false,
  };

  config.errorMessage = {
    '404': 'Page not found!',
    '500': 'server error!'
  };

  config.static = {
    prefix: '/',
    dir: join(appInfo.baseDir, 'dist')
  }

  return config;
};
