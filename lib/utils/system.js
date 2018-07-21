'use strict';

exports.attach = (origin, goods) => origin.indexOf(goods) === -1 ?
    `${origin},${goods}` : origin;

exports.getObject = str => {
    try {
        return eval(str);
    }
    catch (e) {
        return str;
    }
};