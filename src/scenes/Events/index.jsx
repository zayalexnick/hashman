import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import { Link } from 'react-router-dom';
import { Message } from './styles';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';
import typeFromNumber from '~/utils/typeFromNumber';

@hot(module)
@connect((state) => ({
    events: state.events
}), actions)
export default class extends Component
{
    state = {
        update: null
    };

    componentDidMount()
    {
        this.props.getEvents();

        this.setState({ update: setInterval(() => this.props.getEvents(), 5000) });
    }

    listenAll = () => {
        this.props.events.entities.map((event) => {
            localStorage.setItem(`event-${event.EventID}`, true);
        })
    };

    unread = () => {
        let i = 0;

        this.props.events.entities.map((event) => {
            if (!localStorage.getItem(`event-${event.EventID}`)) i++;
        });

        return i;
    };

    componentWillUnmount()
    {
        clearInterval(this.state.update);
        this.listenAll();
        this.props.eventsClear();
    }

    render()
    {
        const { events } = this.props;

        return (
            <div>
                <Title sub={{ type: 'success', label: `(${this.unread()})` }}>Уведомления</Title>
                <Paper title="Последние уведомления">
                    <LoaderContainer loading={events.entities.length === 0}>
                        <Table
                            columns={[
                                {
                                    label: 'Время',
                                    index: 'date',
                                    render: (value) => moment(value).format('L LTS')
                                },
                                {
                                    label: 'Сервер',
                                    index: 'ServerName',
                                    render: (value, record) => <Link to={`/rigs/${record.ServerID}`}>{ value }</Link>
                                },
                                {
                                    label: 'Рига',
                                    index: 'RigName',
                                    render: (value, record) => <Link to={`/rig/${record.RigID}`}>{ value }</Link>
                                },
                                {
                                    label: 'Тип',
                                    index: 'EventType'
                                },
                                {
                                    label: 'Сообщение',
                                    index: 'Message',
                                    render: (value, record) => <Message type={typeFromNumber(record.MessageT)}>{ value }</Message>
                                }
                            ]}
                            dataSource={events.entities}
                            pagination={true}
                            onRow={(record) => {
                                if (!localStorage.getItem(`event-${record.EventID}`))
                                    return { styles: { backgroundColor: '#edfff2' } }
                            }}
                        />
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}