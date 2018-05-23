import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';
import { Loader, LoaderWrapper } from 'components/Loader';
import * as actions from 'scenes/Auth/actions';

@connect((state) => ({
    auth: state.auth
}), actions)
export default class Routing extends Component
{
    componentDidMount()
    {
        this.props.login();
    }

    render()
    {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/auth" component={routes[1].component} />
                        <Route path="/" component={routes[0].component} />
                    </Switch>
                </div>
            </Router>
        );
    }
}