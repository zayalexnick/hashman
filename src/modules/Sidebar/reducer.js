/**
    @flow
 */

import { createReducer } from 'redux-act';
import * as actions from './actions';

type State = {
    hidden: boolean
}

const initialState: State = {
    hidden: true
};

const reducer = createReducer({
    [actions.toggleSidebar]: (state) => ({ ...state, hidden: !state.hidden })
}, initialState);

export default reducer;