'use strict';

const LocalStrategy = require('passport-local').Strategy;
const qs = require('querystring');

module.exports = app => {

    const { mysql } = app;

    app.validator.addRule('json', (rule, value) => {
        try {
            JSON.parse(value);
        } 
        catch (err) {
            return 'must be json string';
        }
    });
    
    app.validator.addRule('encrypt', (rule, value) => {
        try {
            app.utils.decryptQuery(value);
        }
        catch (err) {
            return 'invalid query string!'
        }
    });

};

