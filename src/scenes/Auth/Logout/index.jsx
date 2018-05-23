import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Loader, LoaderWrapper } from "components/Loader";

@connect((state) => ({
    auth: state.auth
}), actions)
export default class Logout extends Component
{

    componentDidMount()
    {
        this.props.logout();
    }

    render()
    {
        const { authorized } = this.props.auth;

        if (!authorized && authorized !== null ) return <Redirect to="/auth/signin" />;

        return (
            <LoaderWrapper visible full>
                <Loader />
            </LoaderWrapper>
        );
    }
}