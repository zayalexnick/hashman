import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';

import Routing from 'components/Routing';

export default () => (
    <Provider store={configureStore()}>
        <Routing />
    </Provider>
);