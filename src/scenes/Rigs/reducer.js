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
    [actions.rigsRequested]: (state) => ({ ...state, loading: true }),
    [actions.rigsReceived]: (state) => ({ ...state, loading: false }),
    [actions.rigsSuccessed]: (state, payload) => ({ ...state, data: payload.data }),
    [actions.rigsFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } })
}, initialState);

export default reducer;