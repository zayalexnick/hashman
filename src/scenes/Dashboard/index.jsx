import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Content } from './styles';
import * as AuthActions from '~/scenes/Auth/actions';

import Sidebar from '~/modules/Sidebar';
import Topbar from '~/modules/Topbar';

import HomeScreen from '~/scenes/Home';
import ServersScreen from '~/scenes/Servers';
import RigsScreen from '~/scenes/Rigs';
import RigScreen from '~/scenes/Rig';
import EventsScreen from '~/scenes/Events';
import IncomeScreen from '~/scenes/Income';
import ReportsScreen from '~/scenes/Reports';

import navigation from '~/navigation';

type Props = {

};

@hot(module)
@connect((state) => ({
    auth: state.auth,
    sidebar: state.sidebar
}), AuthActions)
export default class extends Component<Props>
{
    componentWillMount()
    {
        this.props.checkAuth();
    }

    logoutHandler = () => {
        this.props.logout();
    };

    render()
    {
        const { hidden } = this.props.sidebar;
        const { authorized, fullname } = this.props.auth.entities;

        if (!authorized) return <Redirect to="/auth" />;

        return (
            <main>
                <Sidebar
                    logo={{ to: '/', label: 'Hashman' }}
                    navigate={navigation}
                />
                <Topbar logout={this.logoutHandler} fullname={fullname} />
                <Container hidden={hidden}>
                    <Content>
                        <Switch>
                            <Route exact path={`/`} component={HomeScreen} />
                            <Route exact path={`/dashboard`} component={ServersScreen} />
                            <Route exact path={`/events`} component={EventsScreen} />
                            <Route exact path={`/rigs/:id`} component={RigsScreen} />
                            <Route exact path={`/rigs`} component={RigsScreen} />
                            <Route exact path={`/income`} component={IncomeScreen} />
                            <Route exact path={`/rig/:id`} component={RigScreen} />
							<Route exact path={`/report`} component={ReportsScreen} />
                        </Switch>
                    </Content>
                </Container>
            </main>
        );
    }
}