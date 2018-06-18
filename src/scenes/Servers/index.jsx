import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import moment from 'moment'
import * as actions from './actions';
import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import Tag, { Group } from '~/components/Tag';
import Tabs from '~/components/Tabs';
import { Row, Col } from '~/components/Grid';
import * as ToolTip from '~/components/ToolTip';
import temperature from '~/utils/temperature';
import hashrate from '~/utils/hashrate';
import typeFromNumber from '~/utils/typeFromNumber';
import Event from '~/components/Event';

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
    servers: state.servers
}), actions)
export default class extends Component
{
    state = {
        update: null
    };

    async componentDidMount()
    {
        this.props.getServers();
        this.props.getCharts();

        this.setState({ update: setInterval(() => {
            this.props.getServers();
            this.props.getCharts();
        }, 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

    getCoinsValue = () => {
        const coins = {};

        this.props.servers.entities.map((server) => {
            server.Coins.map((coin) => {
                if (!coins.hasOwnProperty(coin.Coin))
                    coins[coin.Coin] = {
                        coin: null,
                        hashrate: 0,
                        income: 0
                    };

                coins[coin.Coin].coin = coin.Coin;
                coins[coin.Coin].hashrate += coin.hashrate;
                coins[coin.Coin].income += coin.daylyIncome;
            });
        });

        const coinsArr = [];
        for (let coin in coins)
            coinsArr.push(coins[coin]);

        return coinsArr;
    };

    getInfo = () => {
        const info = {
            RigsTotal: 0,
            RigsOnline: 0,
            RigsWarning: 0,
            RigsError: 0,
            RigsOffline: 0,
        };

        this.props.servers.entities.map((server) => {
            info.RigsTotal += server.RigsTotal;
            info.RigsOnline += server.RigsOnline;
            info.RigsWarning += server.RigsWarning;
            info.RigsError += server.RigsError;
            info.RigsOffline += server.RigsOffline;
        });

        return info;
    };

    hashrateCharts = () => {
        let charts = [];
        Object.keys(this.props.servers.charts.Hashrate).map((chart) => charts.push({
            label: `${chart}: ${hashrate(this.props.servers.charts.currentHashrate[chart])}`,
            index: chart,
            content: (
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={this.props.servers.charts.Hashrate[chart]}>
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

        if (Object.keys(this.props.servers.charts).length > 0)
            Object.keys(this.props.servers.charts.currentTemperatures).map((item, index) =>
                arr.push(<Tag type={getType(item)} key={index}>{ item }: { temperature(this.props.servers.charts.currentTemperatures[item]) }</Tag>)
            );

        return arr;
    };

    render()
    {
        const { servers } = this.props;

        return (
            <div>
                <Title>Фермы</Title>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Стабильность" loading={Object.keys(servers.charts).length === 0} subes={[
                            <Tag type="primary" key={1}>Всего: {this.getInfo().RigsTotal}</Tag>,
                            <Tag type="success" key={2}>Онлайн: {this.getInfo().RigsOnline}</Tag>,
                            <Tag type="warning" key={3}>С ошибками: {this.getInfo().RigsWarning}</Tag>,
                            <Tag type="error" key={4}>Нерабочие: {this.getInfo().RigsOffline}</Tag>,
                        ]}>
                            <ResponsiveContainer width="100%" height={80}>
                                <BarChart data={servers.charts.Stability}>
                                    <Tooltip content={<TooltipStability />} />
                                    <Bar dataKey="uptime" stackId="a" fill="#87d068" />
                                    <Bar dataKey="downtime" stackId="a" fill="#ff5500" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Хэшрейт" loading={Object.keys(servers.charts).length === 0}>
                            { Object.keys(servers.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Температура" loading={Object.keys(servers.charts).length === 0} subes={this.getCurrentTemperature()}>
                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={servers.charts.Temperature}>
                                    <Tooltip content={<TooltipTemperature />} />
                                    <Line dot={false} type='monotone' dataKey='В Помещении' strokeWidth={2} stroke='#87d068' />
                                    <Line dot={false} type='monotone' dataKey='BTC' strokeWidth={2} stroke='#4482ff' />
                                    <Line dot={false} type='monotone' dataKey='ETH' strokeWidth={2} stroke='#ff5500' />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="События" loading={Object.keys(servers.charts).length === 0}>
                            {Object.keys(servers.charts).length > 0 ? (
                                servers.charts.Events.map((item, index) => (
                                    <Event key={index} type={typeFromNumber(item.MessageT)}>
                                        <span className="date">{ moment(item.date).format('L LT') }</span>{' '}<Link to={`/rigs/${item.ServerID}`}>{ item.ServerName }</Link>{' '}<Link to={`/rig/${item.RigID}`}>{ item.RigName }</Link>{' '}{ item.Message }
                                    </Event>
                                ))
                            ) : null }
                        </Paper>
                    </Col>
                </Row>
                <Paper title="Текущие фермы">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        <Table
                            columns={[
                                {
                                    label: 'ID',
                                    index: 'ServerID',
                                    sorter: true, compare: (a, b) => a.id - b.id
                                },
                                {
                                    label: 'Сервер',
                                    index: 'ServerName',
                                    render: (value, record) => <Link to={`/rigs/${record.ServerID}`}>{value}</Link>,
                                    sorter: true, compare: (a, b) => a.ServerName.localeCompare(b.ServerName)
                                },
                                {
                                    label: 'Температура',
                                    index: 'MaxTemp',
                                    render: (value, record) => <Group>{record.Coins.map((coin, index) => (<Tag type={typeFromNumber(coin.MaxTempT)} key={index}>{coin.Coin}: {temperature(coin.MaxTemp)}</Tag>))}</Group>
                                },
                                {
                                    label: 'В помещении',
                                    index: 'Temperature',
                                    render: (value) => temperature(value)
                                },
                                {
                                    label: 'Хэшрейт',
                                    index: 'Hashrate',
                                    render: (value, record) => <Group>{record.Coins.map((coin, index) => (<Tag type={typeFromNumber(coin.hashrateT)} key={index}>{coin.Coin}: {hashrate(coin.hashrate)}</Tag>))}</Group>
                                },
                                {
                                    label: 'Риги',
                                    index: 'RigsTotal',
                                    render: (value, record) => (
                                        <Group inline>
                                            <Tag type="primary">{ record.RigsTotal }</Tag>
                                            <Tag type="success">{ record.RigsOnline }</Tag>
                                            <Tag type="warning">{ record.RigsWarning }</Tag>
                                            <Tag type="error">{ record.RigsError }</Tag>
                                            <Tag type="default">{ record.RigsOffline }</Tag>
                                        </Group>
                                    )
                                },
                            ]}
                            dataSource={servers.entities}
                        />
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}