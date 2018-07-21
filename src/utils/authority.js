// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  let au = localStorage.getItem('antd-pro-authority');
  if (au == 'undefined' || !au) {
    au = 'guest';
  }
  console.log(`now auth is ${au}.`);
  return au;
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

export function checkAuthority(authority) {
  return currentAuthority => {
    const result = !!((currentAuthority || 'guest').split(',').filter(
      ca => (authority || 'dugkarn8vzmr9djej9e').indexOf(ca) !== -1).length);
    if (!result) {
      // console.log(`current: ${currentAuthority}`);
      // console.log(`authority: ${authority}`);
    }
    return result;
  }
}