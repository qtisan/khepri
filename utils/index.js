'use strict';

const { ObjectId } = require('bson');
const { encodeByMap, decodeByMap } = require('../lib/crypto/encoding');
const SqlQuery = require('../lib/query/sqlquery');

const queryEncryptParam = {
    bit: 6,
    map: 'Q4KmX-EDCRopBTGS7as2rWVtuiYnHxz8LOPA0yZk3j6_qwehN9IlUJ51FMbvgfcd'
};

/** 
* 检验18位身份证号码（15位号码可以只检测生日是否正确即可） 
* @author lennon 
* @param cid 18为的身份证号码 
* @return Boolean 是否合法 
**/
exports.isCnNewID = cid => {
    let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子  
    let arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
    if (/^\d{17}\d|x$/i.test(cid)) {
        let sum = 0, idx;
        for (let i = 0; i < cid.length - 1; i++) {
            // 对前17位数字与权值乘积求和  
            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）  
        idx = sum % 11;
        // 检验第18为是否与校验码相等  
        return arrValid[idx] == cid.substr(17, 1).toUpperCase();
    }
    else {
        return false;
    }
};


/** 
* 生成唯一ID，bson中ObjectId的简化版，19位 
* @author lennon 
* @return String ID码 
**/
exports.genId = function genId() {
    return encodeByMap(new ObjectId().toString(), {
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
const encryptQuery = queryString => encodeByMap(queryString, queryEncryptParam);

/** 
* 解密查询方法
* @author lennon 
* @param queryCode String，查询字符串的加密码
* @return String 解密后的querystring
**/
const decryptQuery = queryCode => decodeByMap(queryCode, queryEncryptParam);

/** 
* 解析查询字符串为SQL语句的方法
* @author lennon 
* @param queryString String，已解密的查询字符串
* @return String 解析出来的SQL语句
**/
const parseQueryString = queryString => new SqlQuery(queryString).build();


/** 
* 解密查询字符串，并解析为SQL语句的方法
* @author lennon 
* @param code String，查询字符串的加密码
* @return String 解密后的SQL语句
**/
exports.codeToSQL = code => parseQueryString(decryptQuery(code));


exports.encryptQuery = encryptQuery;
exports.decryptQuery = decryptQuery;
exports.parseQueryString = parseQueryString;

