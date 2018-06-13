import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip, CartesianGrid } from 'recharts';
import * as actions from './actions';
import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import Tag, { Group } from '~/components/Tag';
import { Row, Col } from '~/components/Grid';
import Tabs from '~/components/Tabs';
import temperature from '~/utils/temperature';
import hashrate from '~/utils/hashrate';
import wallet from '~/utils/wallet';
import typeFromNumber from '~/utils/typeFromNumber';

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
        await this.props.getServers();
        await this.props.getCharts();

        this.setState({ update: setInterval(async () => {
            await this.props.getServers();
            await this.props.getCharts();
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
            RigsOffline: 0
        };

        this.props.servers.entities.map((server) => {
            info.RigsTotal += server.RigsTotal;
            info.RigsOnline += server.RigsOnline;
            info.RigsWarning += server.RigsWarning;
            info.RigsOffline += server.RigsOffline;
        });

        return info;
    };

    render()
    {
        const { servers } = this.props;

        return (
            <div>
                <Title>Фермы</Title>
                <Row>
                    <Col>
                        <LoaderContainer loading={Object.keys(servers.charts).length === 0}>
                            <Paper title="Стабильность" subes={[
                                <Tag type="default" key={1}>Всего: {this.getInfo().RigsTotal}</Tag>,
                                <Tag type="success" key={2}>Онлайн: {this.getInfo().RigsOnline}</Tag>,
                                <Tag type="warning" key={3}>С ошибками: {this.getInfo().RigsWarning}</Tag>,
                                <Tag type="error" key={4}>Нерабочие: {this.getInfo().RigsOffline}</Tag>,
                            ]}>
                                <ResponsiveContainer width="100%" height={80}>
                                    <BarChart data={servers.charts.Stability}>
                                        <Tooltip />
                                        <Bar dataKey="uptime" stackId="a" fill="#87d068" />
                                        <Bar dataKey="downtime" stackId="a" fill="#ff5500" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </LoaderContainer>
                    </Col>
                    <Col>
                        <LoaderContainer loading={Object.keys(servers.charts).length === 0}>
                            <Paper title="Хэшрейт">
                                <Tabs
                                    items={[
                                        {
                                            label: 'BTC',
                                            index: 'btc'
                                        },
                                        {
                                            label: 'ETH',
                                            index: 'eth'
                                        }
                                    ]}
                                />
                            </Paper>
                        </LoaderContainer>
                    </Col>
                    <Col>
                        <LoaderContainer loading={Object.keys(servers.charts).length === 0}>
                            <Paper title="Температура">
                                <ResponsiveContainer width="100%" height={80}>
                                    <LineChart data={servers.charts.Temperature}>
                                        <Tooltip />
                                        <Line dot={false} type='monotone' dataKey='В Помещении' strokeWidth={2} stroke='#87d068' />
                                        <Line dot={false} type='monotone' dataKey='BTC' strokeWidth={2} stroke='#4482ff' />
                                        <Line dot={false} type='monotone' dataKey='ETH' strokeWidth={2} stroke='#ff5500' />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </LoaderContainer>
                    </Col>
                    <Col>
                        <LoaderContainer loading={Object.keys(servers.charts).length === 0}>
                            <Paper title="Дашборд">

                            </Paper>
                        </LoaderContainer>
                    </Col>
                </Row>
                <Paper title="Прибыль">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        <Table
                            columns={[
                                {
                                    label: 'Coin',
                                    index: 'coin'
                                },
                                {
                                    label: 'Хэшрейт',
                                    index: 'hashrate',
                                    render: (value) => hashrate(value)
                                },
                                {
                                    label: 'Прибыль',
                                    index: 'income',
                                    render: (value) => wallet(value)
                                }
                            ]}
                            dataSource={this.getCoinsValue()}
                            pagination={false}
                        />
                    </LoaderContainer>
                </Paper>
                <Paper title="Текущие фермы">
                    <LoaderContainer loading={this.props.servers.entities.length === 0}>
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
                                    render: (value, record) => <Link to={`/server/${record.ServerID}`}>{value}</Link>,
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
                                            <Tag type="default">{ record.RigsTotal }</Tag>
                                            <Tag type="success">{ record.RigsOnline }</Tag>
                                            <Tag type="warning">{ record.RigsWarning }</Tag>
                                            <Tag type="error">{ record.RigsOffline }</Tag>
                                        </Group>
                                    )
                                },
                            ]}
                            dataSource={this.props.servers.entities}
                        />
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}