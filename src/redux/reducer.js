import { combineReducers } from 'redux';

import sidebarReducer from '~/modules/Sidebar/reducer';
import authReducer from '~/scenes/Auth/reducer';
import serversReducer from '~/scenes/Servers/reducer';

export default combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    servers: serversReducer
});