'use strict';

import { stringify } from 'qs';
import request from '../utils/request';
import { encryptQuery } from '../../utils';

export async function authAccount(payload) {
    return request('/api/login/account', {
        method: 'POST',
        body: payload
    });
}
