import React, { Component } from 'react';
import { Layout, Content } from './styles';
import Sidebar from 'modules/Sidebar';
import Topbar from "modules/Topbar";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'scenes/Auth/actions';
import Rigs from 'scenes/Rigs';
import Servers from 'scenes/Servers';
import Events from 'scenes/Events';
import { Loader, LoaderWrapper } from "components/Loader";

@connect((state) => ({
    auth: state.auth
}), actions)
export default class Main extends Component
{
    componentDidMount()
    {
        this.props.login();
    }

    render()
    {
        const { authorized } = this.props.auth;

        if (!authorized && authorized !== null) return <Redirect to="/auth/signin" />;

        if (authorized === null) return (
            <LoaderWrapper visible full>
                <Loader />
            </LoaderWrapper>
        );

        return (
            <main>
                <Layout>
                    <Sidebar />
                    <Topbar />
                    <Content>
                        <Route exact path="/rigs" component={Rigs} />
                        <Route exact path="/rigs/:server" component={Rigs} />
                        <Route exact path="/events" component={Events} />
                        <Route path="/servers" component={Servers} />
                    </Content>
                </Layout>
            </main>
        );
    }
}