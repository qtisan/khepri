'use strict';

const { ObjectID } = require('bson');
const { encodeByMap, decodeByMap } = require('../lib/crypto/encoding');
const SqlQuery = require('../lib/query/sqlquery');
const so = require('../lib/utils/social');
const al = require('../lib/utils/algorithm');
const cv = require('../lib/utils/conversion');

const queryEncryptParam = {
    bit: 6,
    map: 'Q4KmX-EDCRopBTGS7as2rWVtuiYnHxz8LOPA0yZk3j6_qwehN9IlUJ51FMbvgfcd'
};

const funcs = {
    ...al, ...so, ...cv,
};

/** 
* 生成唯一ID，bson中ObjectID的简化版，19位 
* @author lennon 
* @return String ID码 
**/
funcs.genId = function genId() {
    return encodeByMap(new ObjectID().toString(), {
        cipher: null,
        mixed: s => s.substr(1)
    });
};


/** 
* 加密查询方法 
* @author lennon 
* @param queryString String，查询字符串
* @return String 加密后的code
**/
funcs.encryptQuery = function encryptQuery(queryString) {
    return encodeByMap(queryString, queryEncryptParam);
};

/** 
* 解密查询方法
* @author lennon 
* @param queryCode String，查询字符串的加密码
* @return String 解密后的querystring
**/
funcs.decryptQuery = function decryptQuery(queryCode) {
    return decodeByMap(queryCode, queryEncryptParam);
};

/** 
* 解析查询字符串为SQL语句的方法
* @author lennon 
* @param queryString String，已解密的查询字符串
* @return String 解析出来的SQL语句
**/
funcs.parseQueryString = function parseQueryString(queryString) {
    return new SqlQuery(queryString).build();
};

/** 
* 解密查询字符串，并解析为SQL语句的方法
* @author lennon 
* @param code String，查询字符串的加密码
* @return String 解密后的SQL语句
**/
funcs.codeToSQL = function codeToSQL(code) {
    return parseQueryString(decryptQuery(code));
};


module.exports = funcs;
