import { createReducer } from 'redux-act';
import * as actions from './actions';
import { IError } from 'types/response';

type State = {
    loading: boolean,
    authorized: boolean,
    error: IError
}

const initialState: State = {
    loading: false,
    authorized: false,
    error: {
        code: null,
        message: ''
    }
};

const reducer = createReducer({
    [actions.authRequested]: (state) => ({ ...state, loading: true }),
    [actions.authReceived]: (state) => ({ ...state, loading: false }),
    [actions.authFailed]: (state, payload: IError) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.authSuccessed]: (state) => ({ ...state, authorized: true })
}, initialState);

export default reducer;