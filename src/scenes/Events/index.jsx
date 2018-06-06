import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Form as FormA, Switch, Card } from 'antd';
import Content from 'components/Content';
import { Form, Table } from './styles';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as Colors from 'constants/Colors';

moment.locale('ru');

@connect((state) => ({
    events: state.events
}), actions)
export default class Events extends Component
{
    state = {
        update: null,
        pagination: true,
        count: 0,
        columns: [
            {
                title: 'Время',
                dataIndex: 'date',
                key: 'date',
                visible: true,
                render: (value) => moment(value).format('DD/MM/YYYY hh:mm:ss'),
            },
            {
                title: 'Сервер',
                dataIndex: 'ServerName',
                key: 'ServerName',
                visible: true,
                render: (value, record) => <Link to={`/rigs/${record.ServerID}`}>{value}</Link>,
                onFilter: (value, record) => record.ServerName.includes(value)
            },
            {
                title: 'Рига',
                dataIndex: 'RigName',
                key: 'RigName',
                visible: true,
                render: (value, record) => <Link to={`/rigs/${record.RigID}`}>{value}</Link>,
                onFilter: (value, record) => (record.RigName !== null) ? record.RigName.includes(value) : ''
            },
            {
                title: 'Тип',
                dataIndex: 'EventType',
                key: 'EventType',
                visible: true,
                onFilter: (value, record) => record.EventType.includes(value)
            },
            {
                title: 'Сообщение',
                dataIndex: 'Message',
                key: 'Message',
                visible: true,
                render: (value, record) => <span style={{ color: Colors.defaultColors[record.MessageT], fontWeight: 'bold' }}>{value}</span>
            },
        ]
    };

    componentDidMount()
    {
        this.props.getEvents();
        this.listenAll();

        this.setState({ update: setInterval(() => this.props.getEvents(), 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

    listenAll = () => {
        this.props.events.data.map((event, index) => {
            localStorage.setItem(event.EventID, true);
        })
    };

    getServerFilters = () => {
        if (typeof this.props.events.data === 'object' && Object.keys(this.props.events.data).length > 0) {
            const filters = {};
            if (typeof this.props.events.data !== 'undefined') {
                this.props.events.data.map((event) => {
                    if (Object.keys(filters).filter((filter) => filter === event.ServerName).length === 0)
                        filters[event.ServerName] = 1;
                    else
                        filters[event.ServerName]++;
                });
            }
            else {
                return null;
            }

            return Object.keys(filters).map((filter) => ({ text: `${filter} (${filters[filter]})`, value: filter }));
        }

        return null;
    };

    getRigFilters = () => {
        if (typeof this.props.events.data === 'object' && Object.keys(this.props.events.data).length > 0) {
            const filters = {};
            if (typeof this.props.events.data !== 'undefined') {
                this.props.events.data.map((event) => {
                    if (Object.keys(filters).filter((filter) => filter === event.RigName).length === 0)
                        filters[event.RigName] = 1;
                    else
                        filters[event.RigName]++;
                });
            }
            else {
                return null;
            }

            return Object.keys(filters).map((filter) => ({ text: `${filter}`, value: filter }));
        }

        return null;
    };

    getEventTypeFilters = () => {
        if (typeof this.props.events.data === 'object' && Object.keys(this.props.events.data).length > 0) {
            const filters = {};
            if (typeof this.props.events.data !== 'undefined') {
                this.props.events.data.map((event) => {
                    if (Object.keys(filters).filter((filter) => filter === event.EventType).length === 0)
                        filters[event.EventType] = 1;
                    else
                        filters[event.EventType]++;
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
        let count = 0;
        this.props.events.data.map((event) => {
            if (!localStorage.getItem(event.EventID)) {
                count++;
            }
        });

        const columns = this.state.columns;
        columns[1].filters = this.getServerFilters();
        columns[2].filters = this.getRigFilters();
        columns[3].filters = this.getEventTypeFilters();

        this.setState({ count, columns });
    }

    render()
    {
        return (
            <Content loading={this.props.events.data.length === 0}>
                <Scrollbars>
                    <Card title={<h2>Уведомления <span style={{ color: Colors.defaultColors[1] }}>({this.state.count})</span></h2>} bordered={false}>
                        <Table
                            dataSource={this.props.events.data}
                            columns={this.state.columns.filter((column) => column.visible)}
                            pagination={this.state.pagination ? 'footer' : false}
                            onRow={(record) => {
                                if (!localStorage.getItem(record.EventID)) {
                                    return { style: { backgroundColor: '#c6ffd6' } };
                                }
                            }}
                        />
                        <Form layout="inline" type={this.state.pagination}>
                            <FormA.Item label="Показать все">
                                <Switch checked={!this.state.pagination} onChange={() => this.setState({ pagination: !this.state.pagination })} />
                            </FormA.Item>
                        </Form>
                    </Card>
                </Scrollbars>
            </Content>
        );
    }
}