import { combineReducers } from 'redux';

import sidebarReducer from '~/modules/Sidebar/reducer';
import authReducer from '~/scenes/Auth/reducer';
import serversReducer from '~/scenes/Servers/reducer';
import eventsReducer from '~/scenes/Events/reducer';
import rigsReducer from '~/scenes/Rigs/reducer';
import rigReducer from '~/scenes/Rig/reducer';

export default combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    servers: serversReducer,
    events: eventsReducer,
    rigs: rigsReducer,
    rig: rigReducer
});