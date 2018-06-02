import { createReducer } from 'redux-act';
import * as actions from './actions';

type initialState = {
    error: {
        code: number,
        message: string
    },
    pending: {
        loading: boolean,
        ready: boolean
    },
    entities: {
        authorized: boolean,
        login: string,
        fullname: string
    }
}

const initialState = {
    error: {
        code: 0,
        message: null
    },
    pending: {
        loading: false
    },
    entities: {
        authorized: false,
        login: null,
        fullname: null
    }
};

const reducer = createReducer({
    [actions.authRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.authRecieved]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.authFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.ErrorCode, password: payload.ErrorString }, entities: { ...state.entities, authorized: false } }),
    [actions.authFailed]: (state, payload) => ({ ...state, entities: { ...state.entities, authorized: true, login: payload.login, fullname: payload.FullName } }),
}, initialState);

export default reducer;