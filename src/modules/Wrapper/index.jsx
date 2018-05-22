import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

@connect((state) => ({
    auth: state.auth
}))
export default class Wrapper extends Component
{
    render()
    {
        /*const { authorized } = this.props.auth;

        if (!authorized) return <Redirect to="/auth/login" />;*/

        return this.props.children;
    }
}