import { combineReducers } from 'redux';

import authReducer from 'scenes/Auth/reducer';
import sidebarReducer from 'modules/Sidebar/reducer';
import rigsReducer from 'scenes/Rigs/reducer';
import serversReducer from 'scenes/Servers/reducer';
import eventsReducer from 'scenes/Events/reducer';

export default combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    rigs: rigsReducer,
    servers: serversReducer,
    events: eventsReducer
});