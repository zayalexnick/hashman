import { createReducer } from 'redux-act';
import * as actions from './actions';

type State = {
    active: boolean
};

const initialState: State = {
    active: true
};

const reducer = createReducer({
    [actions.toggle]: (state) => ({ ...state, active: !state.active })
}, initialState);

export default reducer;