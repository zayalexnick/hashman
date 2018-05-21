import React from 'react';
import { BrowserRouter as Router, Route, Index } from 'react-router-dom';

import Auth from 'scenes/Auth';
import Login from 'modules/Login';

export default () => (
    <Router>
        <Route path="/" component={Auth} />
    </Router>
);