import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import SignIn from "./SignIn";
import Logout from './Logout';
import * as actions from './actions';

@connect((state) => ({
    auth: state.auth
}), actions)
export default class Auth extends Component
{
    render()
    {
        return (
            <div>
                <Route path="/auth/logout" component={Logout} />
                <Route path="/auth/signin" component={SignIn} />
            </div>
        );
    }
}