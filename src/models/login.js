import { authAccount, fakeCurrentUser, logout } from '../services/auth';
import { setAuthority } from '../utils/authority';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    message: 'server error!',
  },

  effects: {
    *login({ payload: { username, password, autoLogin } }, { call, put }) {
      let response = yield call(authAccount, { username, password });
      if (!response || response.status !== 'ok') {
        response = {
          data: {
            status: 401,
            type: 'account',
            currentAuthority: 'guest',
            message: response.message
          }
        }
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response.data,
      });
      console.log(response.data);
      if (response.status === 'ok') {
        window.location.reload();
      }
    },
    *logout(_, { call, put, select }) {
      const response = yield call(logout);
      if (response.status === 'ok') {
        try {
          // get location pathname
          const urlParams = new URL(window.location.href);
          const pathname = yield select(state => state.routing.location.pathname);
          // add the parameters in the url
          urlParams.searchParams.set('redirect', pathname);
          window.history.pushState(null, 'login', urlParams.href);
        } finally {
          // yield put(routerRedux.push('/user/login'));
          // Login out after permission changes to admin or user
          // The refresh will automatically redirect to the login page
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 401,
              currentAuthority: 'guest',
            },
          });
          window.location.reload();
        }
      }
      else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 200,
            message: response.message,
            resume: true
          }
        });
      }
    },
    *checkLogin(_, { call, put }) {
      let response = yield call(fakeCurrentUser);
      if (response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data
        });
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // TODO: autoLogin set cookies
      if (!payload.resume) {
        if (!payload.currentAuthority) {
          payload.currentAuthority = payload.authority;
        }
        setAuthority(payload.currentAuthority);
      }
      return {
        ...state,
        currentAuthority: payload.currentAuthority,
        status: payload.status,
        type: payload.type,
        message: payload.message
      };
    },
  },
};
