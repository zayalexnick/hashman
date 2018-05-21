import { combineReducers } from 'redux';

import authReducer from 'scenes/Auth/reducer';

export default combineReducers({
    auth: authReducer
});