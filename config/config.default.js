'use strict';

const { join } = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515815284088_5931';

  config.session = {
    keys: appInfo.name + '_kiKtD4U_kldJ_IJ917829NHp2k',
    maxAges: 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };

  // add your config here
  config.middleware = ['headers', 'notFound'];
  config.headers = {
    type: 'application/json; charset=utf-8'
  };

  config.security = {
    csrf: {
      ignore: ctx => ctx.ip.indexOf('192.168.') !== -1
    }
  };

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

  config.onerror = {
    all(err, ctx) {
      if (ctx.status === 422) {
        const { query, body } = ctx.request;
        ctx.stat(2001, { query, body });
      }
      ctx.status = 200;
      ctx.type = 'application/json; charset=utf-8';
      ctx.body = JSON.stringify(ctx.body);
    }
  };

  config.static = {
    prefix: '/',
    dir: join(appInfo.baseDir, 'dist')
  };

  config.utils = {
    client: {
      path: [
        join(__dirname, '../utils')
      ]
    }
  };

  return config;
};
