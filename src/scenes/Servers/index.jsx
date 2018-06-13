import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import Tag, { Group } from '~/components/Tag';
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
        this.setState({ update: setInterval(() => this.props.getServers(), 5000) })
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

    render()
    {
        return (
            <div>
                <Title>Фермы</Title>
                <Paper title="Прибыль">
                    <LoaderContainer loading={this.props.servers.entities.length === 0}>
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
                                    sorter: true, compare: (a, b) => a.title.localeCompare(b.title)
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