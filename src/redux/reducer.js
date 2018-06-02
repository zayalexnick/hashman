import { combineReducers } from 'redux';

import sidebarReducer from '~/modules/Sidebar/reducer';
import authReducer from '~/scenes/Auth/reducer';

export default combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer
});