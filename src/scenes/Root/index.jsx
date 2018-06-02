import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AuthScene from '~/scenes/Auth';
import DashboardScene from '~/scenes/Dashboard';

type Props = {};

@hot(module)
export default class extends Component<Props> {
    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/auth" component={AuthScene} />
                    <Route path="/" component={DashboardScene} />
                </Switch>
            </BrowserRouter>
        );
    }
}