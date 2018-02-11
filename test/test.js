

// const { codeToSQL, encryptQuery } = require('../utils');

// const str = 'username=khepri&password=47f080dcece1ab00f1270e4ed1354859';
// console.log(encryptQuery(str));




// const code = 'vyMyIyM0IyNraGVwcmlfY3J5cHRI.xE-PnErfH1ylt5JynkreBsiZYVWqimJwiVMJt5y0pEJynkW8nZ-wis9lit-JiVMAis9JH5WIt5y0V1WlitR8YVMZnJU3xtTyHyfeuVJypE-5utaOHP9OiEaIitTlpEfIiJfji-whHZx8YVMZnJU3n1Rkt5MOnVrqn1Rkt59yxZWqos0qHE-IiVMUt5y0V1TMHJfwiVMJpACenVWexWfji-U3nVWexWfeuVJypk4OHZWex-fwiVMJpEJynkW8YV7eHE-IiVMUt5y0os9wiVMJt1TUutaJHJwNutROnWflxE-UxtBeH1aOxDWlt5ThiEWxoDTUutaJHJfeuVJyos9Oxta3n1RnxtTyHyfjnZihpkWlitR8YVaxoDWlitR8HEflx-wNn1TUt5yeiZgeHEflx-fji-U3HEflx-fqitiynK9Nn1TUt5-5utaOHywjnV-kiWfjnZihpZywuVxyt5y0tsOjnV-kiWfqYVM_os0jpEJynkW8HZfqiWwlztT8HZfqisMIn59yt5y0tsOkHZfJH-fji-wkHZfJH-fjnZihtsOkHZfJH-feuVJyosNLHZfqiWfeuVJypK4In59yt1TUutaJHIMlxE-UxtBjpEJynkW8nEyeYIMqYVM_Rkx3itRySV-eiKOkHZ-0isMkxEreG2QqH1aJiEWexKMjHIMUHkWypEfIoE-kisMqxEreB27quVxypZylpZMJnENjpE-eiKOhHPOlitLeitXeBs9OiEa8xEywisMPxDHeBAQ9TIUNTsUNTDNIBmX1p2QFp2XNos9wiVMJt5y0pZ9jY5reH1ylxEWwoP0quVM0oEJynkW8H1aOxDWlVlRxpZW9pkL9pK4wiVMJt1TUutaJHJq9tsMyHsMFBs0jRZfIiEWIStTyHtWynZTyVlRxpZayH5BqH5W9xVWeu5WnBWUeiEWluIiqYVJjxmU9pQQQQm-';

// console.log(codeToSQL(code));


// const defaultResponse = {
//     success: true,
//     message: 'success',
//     body: {
//         foo: 'hello, it is the default!'
//     }
// };
// console.log(JSON.stringify(defaultResponse, null, 4));


// function isCnNewID(cid) {
//     let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子  
//     let arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
//     if (/^\d{17}\d|x$/i.test(cid)) {
//         let sum = 0, idx;
//         for (let i = 0; i < cid.length - 1; i++) {
//             // 对前17位数字与权值乘积求和  
//             sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
//         }
//         // 计算模（固定算法）  
//         idx = sum % 11;
//         // 检验第18为是否与校验码相等  
//         if (arrValid[idx] == cid.substr(17, 1).toUpperCase()) {
//             return true;
//         }
//         else {
//             console.log(cid.substr(0, 17) + arrValid[idx]);
//             return false;
//         }
//     }
//     else {
//         return false;
//     }
// }  

// console.log(isCnNewID('320103198808309314'));