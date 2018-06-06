import { createReducer } from 'redux-act';
import * as actions from './actions';
import { IError } from 'types/response';

type State = {
    loading: boolean,
    authorized: boolean,
    login: string,
    fullname: string,
    error: IError
}

const initialState: State = {
    loading: false,
    authorized: null,
    login: null,
    fullname: null,
    error: {
        code: null,
        message: ''
    }
};

const reducer = createReducer({
    [actions.authRequested]: (state) => ({ ...state, loading: true }),
    [actions.authReceived]: (state) => ({ ...state, loading: false }),
    [actions.authFailed]: (state, payload: IError) => ({ ...state, authorized: false, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.authSuccessed]: (state, payload) => ({ ...state, authorized: true, login: payload.login, fullname: payload.FullName }),
    [actions.authLogouted]: () => ({ ...initialState, authorized: false })
}, initialState);

export default reducer;