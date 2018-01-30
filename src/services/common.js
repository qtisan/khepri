
import request from '../utils/request';

export async function req({method, url, body, headers}) {
    return request(url, { method, body, headers });
}