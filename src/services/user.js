import request from '../utils/request';
import { post } from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return post('/passport/local/current');
}
