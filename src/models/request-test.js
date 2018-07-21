
import { req } from '../services/common';

const defaultResponse = {
    success: true,
    message: 'success',
    body: {
        foo: 'hello, it is the default!'
    }
};

export default {
    
    namespace: 'request-test',

    state: {
        responseJson: JSON.stringify(defaultResponse, null, 4)
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const json = yield call(req, payload);
            // console.log(payload);
            yield put({
                type: 'show',
                payload: JSON.stringify(json, null, 4)
            });
        }
    },

    reducers: {
        show(state, { payload }) {
            return { ...state, responseJson: payload }
        }
    }

}