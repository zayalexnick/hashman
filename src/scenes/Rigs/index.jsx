import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Servers/actions';
import RigsTable from './Table';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import Tabs from '~/components/Tabs';
import Tag from '~/components/Tag';
import typeFromNumber from '~/utils/typeFromNumber';

@hot(module)
@connect((state) => ({
    servers: state.servers
}), actions)
export default class extends Component // TODO Сделать устройства и устройство
{
    componentDidMount()
    {
        this.props.getServers();
    }

    getItems = () => {
        const items = [];

        const order = [4, 1, 2, 3, 0];

        this.props.servers.entities.map((server) => items.push({
            label: <div style={{ display: 'flex', alignItems: 'center' }} ><span style={{ marginRight: '5px' }}>{ server.ServerName }</span> { Object.keys(server).filter((item) => item.indexOf('Rigs') !== -1).map((item, index) => <Tag key={index} type={typeFromNumber(order[index])}>{ server[item] }</Tag>) }</div>,
            index: server.ServerID,
            content: <RigsTable server={server} />
        }));

        return items;
    };

    render()
    {
        const { servers, match } = this.props;

        return (
            <div>
                <Title>Устройства</Title>
                <Paper title="Текущие устройства">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        { servers.entities.length > 0 ? <Tabs items={this.getItems()} activeItem={match.params.id} /> : null }
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}