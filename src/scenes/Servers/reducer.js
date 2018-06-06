import { createReducer } from 'redux-act';
import * as actions from './actions';
import type {IError} from "types/response";

type State = {
    loading: boolean,
    error: IError,
    data: Array<any>
}

const initialState: State = {
    loading: false,
    error: {
        code: 0,
        message: ''
    },
    data: []
};

const reducer = createReducer({
    [actions.serversRequested]: (state) => ({ ...state, loading: true }),
    [actions.serversReceived]: (state) => ({ ...state, loading: false }),
    [actions.serversSuccessed]: (state, payload) => ({ ...state, data: payload.data }),
    [actions.serversFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } })
}, initialState);

export default reducer;