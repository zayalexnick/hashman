import { createReducer } from 'redux-act';
import * as actions from './actions';

type State = {
    error: {
        code: number,
        message: string
    },
    pending: {
        loading: boolean
    },
    entities: Array<any>
};

const initialState: State = {
    error: {
        code: 0,
        message: ''
    },
    pending: {
        loading: false
    },
    entities: []
};

const reducer = createReducer({
    [actions.rigsRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.rigsReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.rigsFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.rigsSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.rigsClear]: (state) => ({ ...state, entities: [] }),
}, initialState);

export default reducer;