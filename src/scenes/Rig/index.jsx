import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import Title from '~/components/Title';
import { Row, Col } from '~/components/Grid';
import Sticker from '~/components/Sticker';
import Stat from '~/components/Stat';
import Tabs from '~/components/Tabs';
import LoaderContainer from '~/components/Loader';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import WrenchIcon from 'react-icons/lib/md/build';
import CogsIcon from 'react-icons/lib/fa/cogs';
import MemoryIcon from 'react-icons/lib/md/memory';
import VideoIcon from 'react-icons/lib/md/personal-video';
import { Buttons, Button } from './styles';
import RestartIcon from 'react-icons/lib/io/android-refresh';
import EditIcon from 'react-icons/lib/io/edit';
import hashrate from '~/utils/hashrate';
import Paper from '~/components/Paper';
import temperature from '~/utils/temperature';
import memory from '~/utils/memory';
import moment from "moment";
import * as ToolTip from '~/components/ToolTip';
import Tag from '~/components/Tag';
import theme from '~/theme';
import Event from '~/components/Event';
import typeFromNumber from '~/utils/typeFromNumber';
import { Table } from '~/components/Table';
import { Message } from '~/scenes/Events/styles';

const Settings = ({ rig }) => (
    <Buttons>
        <Button disabled={!rig.canEdit} type="primary"><div className="icon"><EditIcon /></div><span>Редактировать</span></Button>
        <Button disabled={!rig.canReboot} type="warning"><div className="icon"><RestartIcon /></div><span>Перезагрузить</span></Button>
    </Buttons>
);

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
    rig: state.rig
}), actions)
export default class extends Component
{
    state = {
        update: null
    };

    componentDidMount()
    {
        this.props.getRig(this.props.match.params.id);
        this.props.getCharts(this.props.match.params.id);
        this.props.getEvents(this.props.match.params.id);

        this.setState({ update: setInterval(() => {
            this.props.getRig(this.props.match.params.id);
            this.props.getCharts(this.props.match.params.id);
            this.props.getEvents(this.props.match.params.id);
        }, 5000) });
    }

    componentWillUnmount()
    {
        this.props.rigClear();
        clearInterval(this.state.update);
    }

    hashrateCharts = () => {
        let charts = [];
        Object.keys(this.props.rig.charts.Hashrate).map((chart, index) => charts.push({
            label: chart,
            index: chart,
            content: (
                <ResponsiveContainer key={index} width="100%" height={80}>
                    <LineChart data={this.props.rig.charts.Hashrate[chart]}>
                        <Tooltip content={<TooltipHashrate />} />
                        <Line dot={false} type='monotone' dataKey='value' strokeWidth={2} stroke='#ff0000' />
                    </LineChart>
                </ResponsiveContainer>
            )
        }));
        return charts;
    };

    render()
    {
        const { rig } = this.props;
        const { entities } = rig;

        const time = entities.IsOnline ? moment.duration(entities.Uptime, 'seconds') : moment.duration(entities.downtime, 'seconds');

        return (
            <div>
                <Title right={<Settings rig={entities} />} subtitle={entities.rigHash}>Рига: { entities.Name }</Title>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Стабильность" loading={Object.keys(rig.charts).length === 0} subes={[
                            <Tag type={ entities.IsOnline ? 'success' : 'error' }>{ time.humanize(false) }</Tag>,
                        ]}>
                            <ResponsiveContainer width="100%" height={80}>
                                <BarChart data={rig.charts.Stability}>
                                    <Tooltip content={<TooltipStability />} />
                                    <Bar dataKey="uptime" stackId="a" fill="#87d068" />
                                    <Bar dataKey="downtime" stackId="a" fill="#ff5500" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Хэшрейт" loading={Object.keys(rig.charts).length === 0}>
                            { Object.keys(rig.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="Температура" loading={Object.keys(rig.charts).length === 0} subes={[
                            <Tag type="success" key={1}>В помещении: { temperature(0) }</Tag>,
                            <Tag type="primary" key={2}>BTC: { temperature(65) }</Tag>,
                            <Tag type="error" key={3}>ETH: { temperature(78) }</Tag>
                        ]}>
                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={rig.charts.Temperature}>
                                    <Tooltip content={<TooltipTemperature />} />
                                    <Line dot={false} type='monotone' dataKey='В Помещении' strokeWidth={2} stroke='#87d068' />
                                    <Line dot={false} type='monotone' dataKey='BTC' strokeWidth={2} stroke='#4482ff' />
                                    <Line dot={false} type='monotone' dataKey='ETH' strokeWidth={2} stroke='#ff5500' />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper title="События" loading={Object.keys(rig.charts).length === 0}>
                            {Object.keys(rig.charts).length > 0 ? (
                                rig.charts.Events.map((item, index) => (
                                    <Event key={index} type={typeFromNumber(item.MessageT)}>
                                        <span className="date">{ moment(item.date).format('L LT') }</span>{' '}{ item.Message }
                                    </Event>
                                ))
                            ) : null }
                        </Paper>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="primary" icon={<WrenchIcon />} title="Материнская плата">{ entities.Mainboard }</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="success" icon={<CogsIcon />} title="Процессор">{ entities.CPU }</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="error" icon={<MemoryIcon />} title="Оперативная память">{ memory(entities.RAM) }</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="warning" icon={<VideoIcon />} title="GPU">{ entities.Driver } { entities.GpuCount } шт.</Sticker>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} bg={4}>
                        <LoaderContainer loading={ Object.keys(entities).length === 0 }>
                            <Stat title="Характеристики" items={[
                                {
                                    label: 'Состояние',
                                    icon: <MemoryIcon />,
                                    items: [
                                        {
                                            title: 'Состояние',
                                            text: entities.IsOnline ?
                                                <div style={{ color: theme.notifications.success }}>в сети</div> :
                                                <div style={{ color: theme.notifications.error }}>офлайн</div>
                                        },
                                        {
                                            title: 'Статус',
                                            text: entities.StateStr
                                        },
                                        {
                                            title: 'Скорость',
                                            text: hashrate(entities.HashRate)
                                        },
                                        {
                                            title: entities.IsOnline ? 'Uptime' : 'Downtime',
                                            text: time.humanize(false)
                                        },
                                    ]
                                },
                                {
                                    label: 'Параметры',
                                    icon: <CogsIcon />,
                                    items: [
                                        {
                                            title: 'IP',
                                            text: entities.ip
                                        },
                                        {
                                            title: 'Pool',
                                            text: entities.Pool
                                        },
                                        {
                                            title: 'Режим',
                                            text: entities.RunMode
                                        },
                                        {
                                            title: 'Coin',
                                            text: entities.Coin
                                        },
                                        {
                                            title: 'Кошелек',
                                            text: entities.Wallet
                                        },
                                    ]
                                },
                                {
                                    label: 'Установки',
                                    icon: <RestartIcon />,
                                    items: [
                                        {
                                            title: 'Установлен режим',
                                            text: 'eth2'
                                        },
                                        {
                                            title: 'Установка частоты GPU',
                                            text: '-200'
                                        },
                                        {
                                            title: 'Установка частоты памяти',
                                            text: '1100'
                                        },
                                        {
                                            title: 'Питание GPU',
                                            text: '100Вт'
                                        },
                                    ]
                                }
                            ]} />
                        </LoaderContainer>
                    </Col>
                    <Col xs={12} md={6} bg={8}>
                        <Paper title="События" loading={rig.events.length === 0}>
                            <Table
                                countPerPage={10}
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
                                dataSource={rig.events}
                                pagination={true}
                            />
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}