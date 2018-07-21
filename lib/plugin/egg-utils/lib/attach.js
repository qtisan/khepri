'use strict';

const _ = require('lodash');
const assert = require('assert');

module.exports = app => {
    app.addSingleton('utils', attachUtils);
}

function attachUtils(config, app) {
    assert(config.path.length, `[egg-utils] no utils file defined in config file.`);

    config.path.forEach(p => {
        Object.assign(_, require(p));
        app.coreLogger.info(`[egg-utils] ${p} loaded.`);
    });

    app.beforeStart(function* () {
        app.coreLogger.info(`[egg-utils] attach lodash.js as [utils] in app.`);
    });

    return _;
}
