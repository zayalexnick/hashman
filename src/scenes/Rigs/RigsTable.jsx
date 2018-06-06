import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Switch, Form as FormA, Tag, Row, Col } from 'antd';
import { Table, Form } from './styles';
import Dash from 'components/Dash';
import * as Colors from 'constants/Colors';
import hashrate from 'constants/hashrate';
import CheckIcon from 'react-icons/lib/io/checkmark-round';
import HashRateIcon from 'react-icons/lib/io/code';
import CashIcon from 'react-icons/lib/io/cash';

@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class RigsTable extends Component
{
    state = {
        update: null,
        pagination: true,
        columns: [
            {
                title: 'ID',
                dataIndex: 'UID',
                key: 'UID',
                visible: true
            },
            {
                title: 'Имя',
                dataIndex: 'Name',
                key: 'Name',
                visible: true,
                sorter: (a, b) => a.Name.localeCompare(b.Name)
            },
            {
                title: 'IP',
                dataIndex: 'IP',
                key: 'IP',
                visible: true,
                sorter: (a, b) => a.IP.localeCompare(b.IP)
            },
            {
                title: 'Статус',
                dataIndex: 'StateStr',
                key: 'StateStr',
                visible: true,
                render: (value, record) => <Tag color={Colors.defaultColors[record.StateStrT]}>{value}</Tag>,
                filters: [{
                    text: 'MINING',
                    value: 'MINING'
                }, {
                    text: 'TEST',
                    value: 'TEST'
                }],
                onFilter: (value, record) => record.StateStr.includes(value)
            },
            {
                title: 'Режим',
                dataIndex: 'RunMode',
                key: 'RunMode',
                visible: true,
                render: (value, record) => <Tag color={Colors.defaultColors[record.RunModeT]}>{value}</Tag>,
                onFilter: (value, record) => record.RunMode.includes(value)
            },
            {
                title: 'Температура',
                dataIndex: 'MaxTemp',
                key: 'MaxTemp',
                visible: true,
                render: (value, record) => <Tag color={Colors.defaultColors[record.MaxTempT]}>{value} °C</Tag>,
                sorter: (a, b) => a.MaxTemp - b.MaxTemp
            },
            {
                title: 'Хэшрейт',
                dataIndex: 'Hashrate',
                key: 'Hashrate',
                visible: true,
                render: (value, record) => <Tag color={Colors.defaultColors[record.MaxTempT]}>{hashrate(value)}</Tag>,
                sorter: (a, b) => a.Hashrate - b.Hashrate
            },
            {
                title: 'Коин',
                dataIndex: 'Coin',
                key: 'Coin',
                visible: false,
            },
        ]
    };

    updateColumns = () => {
        const width = window.innerWidth;
        const columns = this.state.columns;

        if (width <= 1050)
            columns[3].visible = false;
        else
            columns[3].visible = true;

        this.setState({
            columns
        });
    };

    getHashrateSum = () => {
        let sum = 0;
        console.log();
        if (typeof this.props.rigs.data === 'object' && Object.keys(this.props.rigs.data).length > 0 && typeof this.props.rigs.data[this.props.server] !== 'undefined')
            this.props.rigs.data[this.props.server].map((rig) => {
                sum += Number(rig.Hashrate);
            });

        return hashrate(sum);
    };

    getStateFilters = () => {
        if (typeof this.props.rigs.data === 'object' && Object.keys(this.props.rigs.data).length > 0) {
            const filters = {};
            if (typeof this.props.rigs.data[this.props.server] !== 'undefined') {
                this.props.rigs.data[this.props.server].map((rig, index) => {
                    if (Object.keys(filters).filter((filter) => filter === rig.StateStr).length === 0)
                        filters[rig.StateStr] = 1;
                    else
                        filters[rig.StateStr]++;
                });
            }
            else {
                return null;
            }

            return Object.keys(filters).map((filter) => ({ text: `${filter} (${filters[filter]})`, value: filter }));
        }

        return null;
    };

    getRunModeFilters = () => {
        if (typeof this.props.rigs.data === 'object' && Object.keys(this.props.rigs.data).length > 0) {
            const filters = {};
            if (typeof this.props.rigs.data[this.props.server] !== 'undefined') {
                this.props.rigs.data[this.props.server].map((rig, index) => {
                    if (Object.keys(filters).filter((filter) => filter === rig.RunMode).length === 0)
                        filters[rig.RunMode] = 1;
                    else
                        filters[rig.RunMode]++;
                });
            }
            else {
                return null;
            }

            return Object.keys(filters).map((filter) => ({ text: `${filter} (${filters[filter]})`, value: filter }));
        }

        return null;
    };


    componentWillReceiveProps()
    {
        const columns = this.state.columns;
        columns[3].filters = this.getStateFilters();
        columns[4].filters = this.getRunModeFilters();
        this.setState({ columns });
    }

    componentDidMount()
    {
        console.log('DID');
        this.props.getRigs(this.props.server);

        this.setState({ update: setInterval(() => this.props.getRigs(this.props.server), 5000) });

        window.addEventListener("resize", this.updateColumns);
        this.updateColumns();
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

    getInfo = (server) => {

    };

    render()
    {
        console.log(this.props);
        return (
            <div>
                <Row>
                    <Col lg={8} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Dash icon={<CheckIcon />} title='Устройства в работе' backgroundHeader='rgb(66, 165, 246)' colorHeader='#fff'>
                            {this.props.serverData.RigsOnline}
                        </Dash>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Dash icon={<HashRateIcon />} title='Хэшрейт' backgroundHeader='rgb(65, 160, 200)' colorHeader='#fff'>
                            {this.getHashrateSum()}
                        </Dash>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24} style={{ marginBottom: '20px' }}>
                        <Dash icon={<CashIcon />} title='Кошелек' backgroundHeader='rgb(60, 150, 250)' colorHeader='#fff'>
                            sadfasdf
                        </Dash>
                    </Col>
                </Row>
                <Table
                    loading={this.props.rigs.data[this.props.server] === undefined || this.props.rigs.data[this.props.server].length === 0}
                    dataSource={this.props.rigs.data[this.props.server]}
                    columns={this.state.columns.filter((column) => column.visible)}
                    pagination={this.state.pagination ? 'footer' : false}
                />
                <Form layout="inline" type={this.state.pagination}>
                    <FormA.Item label="Показать все">
                        <Switch checked={!this.state.pagination} onChange={() => this.setState({ pagination: !this.state.pagination })} />
                    </FormA.Item>
                </Form>
            </div>
        );
    }
}