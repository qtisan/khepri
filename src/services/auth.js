'use strict';

import { stringify } from 'qs';
import request, { post } from '../utils/request';
import { encryptQuery } from '../../utils';

export async function authAccount(payload) {
    return post('/passport/local/login', payload);
}

export async function fakeCurrentUser(payload) {
    return post('/passport/local/current', payload);
}

export async function logout(payload) {
    return post('/passport/local/logout', payload);
}
