import { authAccount } from '../services/auth';
import { setAuthority } from '../utils/authority';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      const response = yield call(authAccount, { username, password });
      if (!response || response.status !== 'ok') {
        response = { status: 401, type: 'account' }
      }
      else {
        window.location.reload();
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
    *logout(_, { put, select }) {
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
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
