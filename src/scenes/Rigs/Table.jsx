import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from './actions';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';
import Tag from '~/components/Tag';
import hashrate from '~/utils/hashrate';
import temperature from '~/utils/temperature';
import typeFromNumber from '~/utils/typeFromNumber';

@hot(module)
@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class extends Component
{
    componentDidMount()
    {
        console.log(this.props.server.ServerName, 'Mounted');
        this.props.getRigs(this.props.server.ServerID);
        this.setState({ update: setInterval(() => this.props.getRigs(this.props.server.ServerID), 5000) });
    }

    componentWillUnmount()
    {
        console.log(this.props.server.ServerName, 'Unmounted');
        clearInterval(this.state.update);
    }

    render()
    {
        const { rigs } = this.props;
        console.log('Rigs', rigs);
        return (
            <LoaderContainer loading={rigs.entities.length === 0}>
                { rigs.entities.length > 0 ? (
                    <Table
                        columns={[
                            {
                                label: 'ID',
                                index: 'UID'
                            },
                            {
                                label: 'Имя',
                                index: 'Name',
                                sorter: true,
                                compare: (a, b) => a.Name.localeCompare(b.Name)
                            },
                            {
                                label: 'IP',
                                index: 'IP',
                                sorter: true,
                                compare: (a, b) => a.IP.localeCompare(b.IP),
                                filtered: true
                            },
                            {
                                label: 'Статус',
                                index: 'StateStr',
                                render: (value, record) => <Tag type={typeFromNumber(record.StateStrT)}>{ value }</Tag>,
                                filtered: true
                            },
                            {
                                label: 'Режим',
                                index: 'RunMode',
                                render: (value, record) => <Tag type={typeFromNumber(record.RunModeT)}>{ value }</Tag>
                            },
                            {
                                label: 'Температура',
                                index: 'MaxTemp',
                                render: (value, record) => <Tag type={typeFromNumber(record.MaxTempT)}>{ temperature(value) }</Tag>,
                                sorter: true
                            },
                            {
                                label: 'Хэшрейт',
                                index: 'Hashrate',
                                render: (value, record) => <Tag type={typeFromNumber(record.HashrateT)}>{ hashrate(value) }</Tag>,
                                sorter: true,
                                compare: (a, b) => a - b
                            },
                        ]}
                        dataSource={rigs.entities[0].Rigs}
                        pagination={false}
                    />
                ) : null }
            </LoaderContainer>
        );
    }
}