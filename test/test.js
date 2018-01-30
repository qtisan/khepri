

const defaultResponse = {
    success: true,
    message: 'success',
    body: {
        foo: 'hello, it is the default!'
    }
};
console.log(JSON.stringify(defaultResponse, null, 4));


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