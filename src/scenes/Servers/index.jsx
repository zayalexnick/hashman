import React, { Component } from 'react';
import Content from 'components/Content';
import Scrollbars from 'react-custom-scrollbars';
import { Tabs, Switch, Form as FormA, Tag, Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Loader, LoaderWrapper } from "components/Loader";
import { Table, Form } from './styles';
import * as Colors from 'constants/Colors';
import hashrate from 'constants/hashrate';
import Sticker from 'components/Sticker';
import GlobeIcon from 'react-icons/lib/io/android-globe';
import CheckIcon from 'react-icons/lib/io/checkmark-round';
import WarningIcon from 'react-icons/lib/io/android-warning';
import ErrorIcon from 'react-icons/lib/io/alert';
import { Link } from 'react-router-dom';

@connect((state) => ({
    servers: state.servers
}), actions)
export default class Servers extends Component
{
    state = {
        update: null,
        pagination: true,
        columns: {
            servers: [
                {
                    title: 'ID',
                    dataIndex: 'ServerID',
                    key: 'ServerID',
                    visible: true
                },
                {
                    title: 'Сервер',
                    dataIndex: 'ServerName',
                    key: 'ServerName',
                    visible: true,
                    render: (value, record) => <Link to={`/rigs/${record.ServerID}`}>{value}</Link>
                },
                {
                    title: 'Температура',
                    dataIndex: 'MaxTemp',
                    key: 'MaxTemp',
                    visible: true,
                    render: (value, record) => {

                        return (
                            <div>
                                {record.Coins.map((coin, index) => (
                                    <Tag key={index}
                                         color={Colors.defaultColors[coin.MaxTempT]}>{coin.Coin}: {coin.MaxTemp} °C</Tag>
                                ))}
                            </div>
                        );
                    }
                },
                {
                    title: 'В помещении',
                    dataIndex: 'Temperature',
                    key: 'Temperature',
                    visible: true,
                    render: (value, record) => `${value} °C`

                },
                {
                    title: 'Хэшрейт',
                    dataIndex: 'Hashrate',
                    key: 'Hashrate',
                    visible: true,
                    render: (value, record) => {
                        return (
                            <div>
                                {record.Coins.map((coin, index) => (
                                    <Tag key={index}
                                         color={Colors.defaultColors[coin.hashrateT]}>{coin.Coin}: {hashrate(coin.hashrate)}</Tag>
                                ))}
                            </div>
                        );
                    }
                },
                {
                    title: 'Риги',
                    dataIndex: 'Rigs',
                    key: 'Rigs',
                    visible: true,
                    render: (value, record) => {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span style={{
                                    borderRadius: '4px 0 0 4px',
                                    lineHeight: '20px',
                                    height: '22px',
                                    padding: '0 12px',
                                    background: Colors.defaultColors[0],
                                    fontSize: '12px',
                                    color: Colors.white
                                }}>{record.RigsTotal}</span>
                                <div style={{
                                    lineHeight: '20px',
                                    height: '22px',
                                    padding: '0 7px',
                                    background: Colors.defaultColors[1],
                                    fontSize: '12px',
                                    color: Colors.white
                                }}>{ record.RigsOnline }</div>
                                <div style={{
                                    lineHeight: '20px',
                                    height: '22px',
                                    padding: '0 7px',
                                    background: Colors.defaultColors[2],
                                    fontSize: '12px',
                                    color: Colors.white
                                }}>{ record.RigsWarning }</div>
                                <div style={{
                                    lineHeight: '20px',
                                    height: '22px',
                                    padding: '0 7px',
                                    borderRadius: '0 4px 4px 0',
                                    background: Colors.defaultColors[3],
                                    fontSize: '12px',
                                    color: Colors.white
                                }}>{ record.RigsOffline }</div>
                            </div>
                        )
                    }
                }
            ],
            income: [
                {
                    title: 'Coin',
                    dataIndex: 'Coin',
                    key: 'Coin',
                    visible: true,
                },
                {
                    title: 'Хэшрейт',
                    dataIndex: 'hashrate',
                    key: 'hashrate',
                    visible: true,
                    render: (value) => hashrate(value)
                },
                {
                    title: 'Прибыль',
                    dataIndex: 'daylyIncome',
                    key: 'daylyIncome',
                    visible: true,
                    render: (value) => `${value.toFixed(2)}$`
                }
            ]
        }
    };

    getCoinsValue = (servers) => {
        const coins = {};

        servers.map((server) => {
            server.Coins.map((coin) => {
                if (!coins.hasOwnProperty(coin.Coin))
                    coins[coin.Coin] = {
                        Coin: null,
                        hashrate: 0,
                        daylyIncome: 0
                    };

                coins[coin.Coin].Coin = coin.Coin;
                coins[coin.Coin].hashrate += coin.hashrate;
                coins[coin.Coin].daylyIncome += coin.daylyIncome;
            });
        });

        const coinsArr = [];
        for (let coin in coins)
            coinsArr.push(coins[coin]);

        return coinsArr;
    };

    getInfo = (servers) => {
        const info = {
            RigsTotal: 0,
            RigsOnline: 0,
            RigsWarning: 0,
            RigsOffline: 0
        };

        servers.map((server) => {
            info.RigsTotal += server.RigsTotal;
            info.RigsOnline += server.RigsOnline;
            info.RigsWarning += server.RigsWarning;
            info.RigsOffline += server.RigsOffline;
        });

        return info;
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

    render()
    {
        const { servers } = this.props;

        return (
            <div style={{height: '100%'}}>
                <Row>
                    <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Sticker
                            number={this.getInfo(servers.data).RigsTotal}
                            text="Всего"
                            icon={<GlobeIcon style={{ color: Colors.white, fontSize: '30px' }} />}
                            fontColor={Colors.white}
                            bgColor={Colors.defaultColors[0]}
                        />
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Sticker
                            number={this.getInfo(servers.data).RigsOnline}
                            text="Онлайн"
                            icon={<CheckIcon style={{ color: Colors.white, fontSize: '30px' }} />}
                            fontColor={Colors.white}
                            bgColor={Colors.defaultColors[1]}
                        />
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Sticker
                            number={this.getInfo(servers.data).RigsWarning}
                            text="С ошибками"
                            icon={<WarningIcon style={{ color: Colors.white, fontSize: '30px' }} />}
                            fontColor={Colors.white}
                            bgColor={Colors.defaultColors[2]}
                        />
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Sticker
                            number={this.getInfo(servers.data).RigsOffline}
                            text="Не рабочие"
                            icon={<ErrorIcon style={{ color: Colors.white, fontSize: '30px' }} />}
                            fontColor={Colors.white}
                            bgColor={Colors.defaultColors[3]}
                        />
                    </Col>
                </Row>
                <Content loading={servers.data.length === 0}>
                    <Scrollbars>
                        <Card title="Прибыль" bordered={false}>
                            <Table
                                dataSource={this.getCoinsValue(servers.data)}
                                columns={this.state.columns.income.filter((column) => column.visible)}
                                pagination={false}
                            />
                        </Card>
                        <Card title="Фермы" bordered={false}>
                            <Table
                                dataSource={servers.data}
                                columns={this.state.columns.servers.filter((column) => column.visible)}
                                pagination={false}
                            />
                        </Card>
                    </Scrollbars>
                </Content>
            </div>
        );
    }
}