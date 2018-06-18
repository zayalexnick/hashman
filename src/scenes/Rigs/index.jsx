import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as serversActions from '~/scenes/Servers/actions';
import * as actions from './actions';
import RigsTable from './Table';
import { Link } from 'react-router-dom';
import { Row, Col } from '~/components/Grid';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import Tabs from '~/components/Tabs';
import Tag from '~/components/Tag';
import typeFromNumber from '~/utils/typeFromNumber';
import moment from "moment/moment";
import Event from '~/components/Event';
import temperature from '~/utils/temperature';
import hashrate from '~/utils/hashrate';
import * as ToolTip from '~/components/ToolTip';

const TooltipStability = (props) => (
    <ToolTip.Container>
        { props.payload.length > 0 ? (
            <ToolTip.Content>
                <ToolTip.Date>{ moment(props.payload[0].payload.date).format('L LT') }</ToolTip.Date>
                { props.payload.map((item, index) => (
                    <ToolTip.Item key={index} color={item.color}>
                        <ToolTip.Name>{ item.name }</ToolTip.Name>
                        <ToolTip.Text>{ item.value }</ToolTip.Text>
                    </ToolTip.Item>
                )) }
            </ToolTip.Content>
        ) : null }
    </ToolTip.Container>
);

const TooltipTemperature = (props) => (
    <ToolTip.Container>
        { props.payload.length > 0 ? (
            <ToolTip.Content>
                <ToolTip.Date>{ moment(props.payload[0].payload.date).format('L LT') }</ToolTip.Date>
                { props.payload.map((item, index) => (
                    <ToolTip.Item key={index} color={item.color}>
                        <ToolTip.Name>{ item.name }</ToolTip.Name>
                        <ToolTip.Text>{ temperature(item.value) }</ToolTip.Text>
                    </ToolTip.Item>
                )) }
            </ToolTip.Content>
        ) : null }
    </ToolTip.Container>
);

const TooltipHashrate = (props) => (
    <ToolTip.Container>
        { props.payload.length > 0 ? (
            <ToolTip.Content>
                <ToolTip.Date>{ moment(props.payload[0].payload.date).format('L LT') }</ToolTip.Date>
                { props.payload.map((item, index) => (
                    <ToolTip.Item key={index} color={item.color}>
                        <ToolTip.Text>{ item.value } { item.payload.postfix }</ToolTip.Text>
                    </ToolTip.Item>
                )) }
            </ToolTip.Content>
        ) : null }
    </ToolTip.Container>
);

@hot(module)
@connect((state) => ({
    servers: state.servers,
    rigs: state.rigs
}), { ...actions, ...serversActions })
export default class extends Component // TODO Сделать устройства и устройство
{
    state = {
        update: null
    };

    componentDidMount()
    {
        this.props.getServers();

        this.setState({ update: setInterval(() => this.props.getServers(), 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
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

    hashrateCharts = () => {
        let charts = [];
        Object.keys(this.props.rigs.charts.Hashrate).map((chart) => charts.push({
            label: `${chart}: ${hashrate(this.props.rigs.charts.currentHashrate[chart])}`,
            index: chart,
            content: (
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={this.props.rigs.charts.Hashrate[chart]}>
                        <Tooltip content={<TooltipHashrate />} />
                        <Line dot={false} type='monotone' dataKey='value' strokeWidth={2} stroke='#ff0000' />
                    </LineChart>
                </ResponsiveContainer>
            )
        }));
        return charts;
    };

    getCurrentTemperature = () => {
        let arr = [];

        const getType = (item) => {
            switch (item)
            {
                case 'ETH': return 'error';
                case 'BTC': return 'primary';
                case 'В помещении': return 'success';
                default: return 'default';
            }
        };

        if (Object.keys(this.props.rigs.charts).length > 0)
            Object.keys(this.props.rigs.charts.currentTemperatures).map((item, index) =>
                arr.push(<Tag type={getType(item)} key={index}>{ item }: { temperature(this.props.rigs.charts.currentTemperatures[item]) }</Tag>)
            );

        return arr;
    };

    render()
    {
        const { servers, rigs, match } = this.props;

        return (
            <div>
                <Title>Устройства</Title>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Стабильность" loading={Object.keys(rigs.charts).length === 0}>
                            <ResponsiveContainer width="100%" height={80}>
                                <BarChart data={rigs.charts.Stability}>
                                    <Tooltip content={<TooltipStability />} />
                                    <Bar dataKey="uptime" stackId="a" fill="#87d068" />
                                    <Bar dataKey="downtime" stackId="a" fill="#ff5500" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Хэшрейт" loading={Object.keys(rigs.charts).length === 0}>
                            { Object.keys(rigs.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Температура" loading={Object.keys(rigs.charts).length === 0} subes={this.getCurrentTemperature()}>
                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={rigs.charts.Temperature}>
                                    <Tooltip content={<TooltipTemperature />} />
                                    <Line dot={false} type='monotone' dataKey='В Помещении' strokeWidth={2} stroke='#87d068' />
                                    <Line dot={false} type='monotone' dataKey='BTC' strokeWidth={2} stroke='#4482ff' />
                                    <Line dot={false} type='monotone' dataKey='ETH' strokeWidth={2} stroke='#ff5500' />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="События" loading={Object.keys(rigs.charts).length === 0}>
                            {Object.keys(rigs.charts).length > 0 ? (
                                rigs.charts.Events.map((item, index) => (
                                    <Event key={index} type={typeFromNumber(item.MessageT)}>
                                        <span className="date">{ moment(item.date).format('L LT') }</span>{' '}<Link to={`/rig/${item.RigID}`}>{ item.RigName }</Link>{' '}{ item.Message }
                                    </Event>
                                ))
                            ) : null }
                        </Paper>
                    </Col>
                </Row>
                <Paper title="Текущие устройства">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        { servers.entities.length > 0 ? <Tabs items={this.getItems()} activeItem={match.params.id} onTab={() => this.props.rigsClear()} /> : null }
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}