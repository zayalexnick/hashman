import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

@connect((state) => ({
    auth: state.auth
}), actions)
export default class Auth extends Component
{
    componentDidMount()
    {
        this.props.login({ login: 'react', pass: 'zzqW1q' });
    }

    render()
    {
        return (
            <div>
                <h1>Auth</h1>
                <Link to="/auth/login">Login</Link>
            </div>
        );
    }
}