import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import { hot } from 'react-hot-loader';

import SignInScene from './SignIn';

import { Wrapper, Content, Logo } from "./styles";

type Props = {};

@hot(module)
@connect((state) => ({
    auth: state.auth
}), actions)
export default class extends Component<Props>
{
    componentDidMount()
    {
        this.props.checkAuth();
    }

    render()
    {
        const { authorized } = this.props.auth.entities;
        const { path } = this.props.match;

        if (authorized)
            return <Redirect to="/" />;

        return (
            <Wrapper>
                <Content>
                    <Logo>Hashman</Logo>
                    <Switch>
                        <Route path={`${path}`} component={SignInScene} />
                    </Switch>
                </Content>
            </Wrapper>
        );
    }
}