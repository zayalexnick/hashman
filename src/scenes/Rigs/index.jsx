import React, { Component } from 'react';
import Content from 'components/Content';
import Scrollbars from 'react-custom-scrollbars';
import { Tabs, Switch, Form as FormA, Tag } from 'antd';
import { connect } from 'react-redux';
import * as actionsRigs from './actions';
import * as actionsServers from 'scenes/Servers/actions';
import { Loader, LoaderWrapper } from "components/Loader";
import RigsTable from './RigsTable';
import * as Colors from 'constants/Colors';

@connect((state) => ({
    rigs: state.rigs,
    servers: state.servers
}), actionsServers)
export default class Rigs extends Component
{
    state = {
        update: null,
        current: null
    };

    componentDidMount()
    {
        this.props.getServers();

        this.setState({ update: setInterval(() => this.props.getServers(this.props.server), 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

    onClickHandler = (current) =>
    {
        this.setState({ current });
        console.log(current);
    };

    renderTab = (server) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px' }}>{server.ServerName}</span>
                <div style={{
                    lineHeight: '20px',
                    height: '22px',
                    padding: '0 7px',
                    borderRadius: '4px 0 0 4px',
                    background: Colors.defaultColors[1],
                    fontSize: '12px',
                    color: Colors.white
                }}>{ server.RigsOnline }</div>
                <div style={{
                    lineHeight: '20px',
                    height: '22px',
                    padding: '0 7px',
                    background: Colors.defaultColors[2],
                    fontSize: '12px',
                    color: Colors.white
                }}>{ server.RigsWarning }</div>
                <div style={{
                    lineHeight: '20px',
                    height: '22px',
                    padding: '0 7px',
                    borderRadius: '0 4px 4px 0',
                    background: Colors.defaultColors[3],
                    fontSize: '12px',
                    color: Colors.white
                }}>{ server.RigsOffline }</div>
            </div>
        );
    };

    getServer = (id) => {
        this.props.servers.data.map((server) => {
            console.log(id, server, id === server.ServerID);
            if (id === server.ServerID) return server;
        });

        return null;
    };

    renderTable = (current, server) => {
        console.log(server);
        if (current === null && typeof this.props.match.params.server === 'undefined')
            return <RigsTable serverData={this.props.servers.data[0]} server={this.props.servers.data[0].ServerID} />;

        if (current == server.ServerID)
            return <RigsTable serverData={server} server={server.ServerID} />;

        if (typeof this.props.match.params.server !== 'undefined')
            return <RigsTable serverData={this.getServer(this.props.match.params.server)} server={this.props.match.params.server} />;

        return null;
    };

    render()
    {

        return (
            <Content loading={this.props.servers.data.length === 0}>
                <Scrollbars>
                    <Tabs defaultActiveKey={this.props.match.params.server} onChange={this.onClickHandler}>
                        {
                            this.props.servers.data.map((server, index) => (
                                <Tabs.TabPane key={server.ServerID} tab={this.renderTab(server)}>
                                    {this.renderTable(this.state.current, server)}
                                </Tabs.TabPane>
                            ))
                        }
                    </Tabs>
                </Scrollbars>
            </Content>
        );
    }
}