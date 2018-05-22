import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);

export default class Routing extends Component
{
    render()
    {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={routes[0].component} />
                    <Route path="/auth" component={routes[1].component} />
                </Switch>
            </Router>
        );
    }
}