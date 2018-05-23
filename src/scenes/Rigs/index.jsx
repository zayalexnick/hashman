import React, { Component } from 'react';
import Content from 'components/Content';
import Scrollbars from 'react-custom-scrollbars';
import { Tabs, Table } from 'antd';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Loader, LoaderWrapper } from "components/Loader";

@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class Rigs extends Component
{
    state = {
        columns: [
            {
                title: 'ID',
                dataIndex: 'RigID',
                key: 'RigID',
                visible: false,
                sorter: (a, b) => a.RigID - b.RigID
            },
            {
                title: 'Имя',
                dataIndex: 'Name',
                key: 'Name',
                visible: true,
                sorter: (a, b) => a.Name - b.Name
            },
            {
                title: 'Статус',
                dataIndex: 'StateStr',
                key: 'StateStr',
                visible: true,
                sorter: (a, b) => a.StateStr.length - b.StateStr.length,
                filters: [
                    { text: 'MINING', value: 'MINING' },
                    { text: 'IDDLE', value: 'IDDLE' },
                ],
                onFilter: (value, record) => {
                    console.log(value, record.StateStr, value === record.StateStr);

                    return record.StateStr === value
                }
            },
            {
                title: 'Режим',
                dataIndex: 'RunMode',
                key: 'RunMode',
                visible: false,
                sorter: (a, b) => a.RunMode.length - b.RunMode.length,
            },
            {
                title: 'Максимальная температура',
                dataIndex: 'MaxTemp',
                key: 'MaxTemp',
                visible: true,
                sorter: (a, b) => a - b,
            },
            {
                title: 'Хэшрейт',
                dataIndex: 'Hashrate',
                key: 'Hashrate',
                visible: true,
                sorter: (a, b) => a.Hashrate.length - b.Hashrate.length,
            },
            {
                title: 'Коин',
                dataIndex: 'Coin',
                key: 'Coin',
                visible: false,
                sorter: (a, b) => a.Coin.length - b.Coin.length,
            },
        ]
    };

    componentDidMount()
    {
        this.props.getRigs();

        setTimeout(() => this.props.getRigs(), 10000);
    }

    render()
    {
        console.log(this.props.rigs.data.length);

        return (
            <Content loading={this.props.rigs.data.length === 0}>
                <Scrollbars>
                    <Tabs>
                        {this.props.rigs.data.map((server, index) => (
                            <Tabs.TabPane key={index} tab={server.ServerName}>
                                <Table dataSource={server.Rigs} columns={this.state.columns.filter((column) => column.visible)} />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Scrollbars>
            </Content>
        );
    }
}