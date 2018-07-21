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
