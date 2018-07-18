import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import Title from '~/components/Title';
import { Row, Col } from '~/components/Grid';
import Stat from '~/components/Stat';
import Tabs from '~/components/Tabs';
import LoaderContainer from '~/components/Loader';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip, ReferenceArea } from 'recharts';
import CogsIcon from 'react-icons/lib/fa/cogs';
import MemoryIcon from 'react-icons/lib/md/memory';
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
import HashrateChart from './charts/Hashrate';
import { rgba } from 'polished';
import _ from "lodash";

const Settings = ({ rig }) => (
    <Buttons>
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
        update: null,
		activeChart: null
    };

    componentDidMount()
    {
        this.props.getRig(this.props.match.params.id);
        this.props.getCharts(this.props.match.params.id);
        this.props.getEvents(this.props.match.params.id);

        this.setState({ update: setInterval(() => {
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
                        <Line dot={false} type='monotone' dataKey='value' strokeWidth={2} stroke={this.state.activeChart === 'hashrate' ? theme.notifications.primary : theme.notifications.hidden} />
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
				case 'GPU': return 'warning';
				case 'ASIC': return 'primary';
				case 'В помещении': return 'success';
				default: return 'default';
			}
		};

		if (Object.keys(this.props.rig.charts).length > 0)
			Object.keys(this.props.rig.charts.currentTemperatures).map((item, index) =>
				arr.push(<Tag type={this.state.activeChart === 'temperature' ? getType(item) : 'hidden'} key={index}>{ item }: { temperature(this.props.rig.charts.currentTemperatures[item]) }</Tag>)
			);

		return arr;
	};

    getInfoChart = (chart) => {
        let newChart = [];

        chart.map((item, index) => {
            newChart.push({ ...item, index })
        });

        return newChart;
    };

    getSettings = () => {
    	const items = [];
    	const group = {};

		_.map(this.props.rig.entities.Config, (item) => {
			if (!group[item.Group]) group[item.Group] = [];
			group[item.Group].push(item);
		});

		return group;
	};

    getStatic = () => {
    	const group = {};

    	group['Оборудование'] = [];
    	group['Состояние'] = [];
    	group['Параметры'] = [];

    	group['Оборудование'].push({
			Description: 'Материнская плата',
			Value: this.props.rig.entities.Mainboard,
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'Процессор',
			Value: this.props.rig.entities.CPU,
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'Оперативная память',
			Value: memory(this.props.rig.entities.RAM),
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'GPU',
			Value: this.props.rig.entities.Driver + ' ' + this.props.rig.entities.GpuCount + 'шт.',
			Miners: null
		});


    	group['Состояние'].push({
			Description: '',
			Value: this.props.rig.entities.IsOnline ? <Tag type="success">в сети</Tag> : <Tag type="error">в сети</Tag>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Состояние',
			Value: <div>{ this.props.rig.entities.IsMining ? <span style={{ color: theme.notifications.success }}>Майнинг</span> : <span style={{ color: theme.notifications.error }}>Простой</span> } <Tag type="hidden">{ moment.duration(this.props.rig.entities.miningTime).humanize() }</Tag></div>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Статус',
			Value: <div>{ this.props.rig.entities.StateStr } <Tag type="hidden">{ moment.duration(this.props.rig.entities.stateTime).humanize() }</Tag></div>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Скорость',
			Value: hashrate(this.props.rig.entities.HashRate),
			Miners: null
		});
    	group['Состояние'].push({
			Description: this.props.rig.entities.IsOnline ? 'Uptime' : 'Downtime',
			Value: moment.duration(this.props.rig.entities.IsOnline ? this.props.rig.entities.Uptime : this.props.rig.entities.downtime).humanize(),
			Miners: null
		});



    	group['Параметры'].push({
			Description: 'IP',
			Value: this.props.rig.entities.ip,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Pool',
			Value: this.props.rig.entities.Pool,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Режим',
			Value: this.props.rig.entities.RunMode,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Coin',
			Value: this.props.rig.entities.Coin,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Кошелек',
			Value: this.props.rig.entities.Wallet,
			Miners: null
		});

    	return group;
	};

    render()
    {
        const { rig } = this.props;
        const { entities } = rig;

        const time = entities.IsOnline ? moment.duration(entities.Uptime, 'seconds') : moment.duration(entities.downtime, 'seconds');

        return (
            <div>
				<Title right={<Settings rig={entities} />} subtitle={entities.rigHash}>Рига: 123</Title>
				<Row>
					<Col xs={12} md={6} lg={3}>
						<Paper title="Стабильность" loading={Object.keys(rig.charts).length === 0} subes={[
							<Tag type={ entities.IsOnline ? 'success' : 'error' }>{ time.humanize(false) }</Tag>,
						]} onMouseEnter={(e) => this.setState({ activeChart: 'stability' })} onMouseLeave={() => this.setState({ activeChart: null })}>
							<ResponsiveContainer width="100%" height={80}>
								<BarChart data={rig.charts.Stability}>
									<Tooltip content={<TooltipStability />} />
									<Bar dataKey="uptime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.success : rgba(theme.notifications.hidden, 0.8)} />
									<Bar dataKey="downtime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.error : theme.notifications.hidden} />
								</BarChart>
							</ResponsiveContainer>
						</Paper>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Paper title="Хэшрейт" loading={Object.keys(rig.charts).length === 0} onMouseEnter={(e) => this.setState({ activeChart: 'hashrate' })} onMouseLeave={() => this.setState({ activeChart: null })}>
							{ Object.keys(rig.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
						</Paper>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Paper title="Температура" loading={Object.keys(rig.charts).length === 0} subes={this.getCurrentTemperature()} onMouseEnter={(e) => this.setState({ activeChart: 'temperature' })} onMouseLeave={() => this.setState({ activeChart: null })}>
							<ResponsiveContainer width="100%" height={80}>
								<LineChart data={rig.charts.Temperature}>
									<Tooltip content={<TooltipTemperature />} />
									<Line dot={false} type='monotone' dataKey='В Помещении' strokeWidth={2} stroke={this.state.activeChart === 'temperature' ? theme.notifications.success : theme.notifications.hidden} />
									<Line dot={false} type='monotone' dataKey='GPU' strokeWidth={2} stroke={this.state.activeChart === 'temperature' ? theme.notifications.warning : theme.notifications.hidden} />
									<Line dot={false} type='monotone' dataKey='ASIC' strokeWidth={2} stroke={this.state.activeChart === 'temperature' ? theme.notifications.primary : theme.notifications.hidden} />
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
                    <Col xs={12} lg={6}>
						<Paper title="Характеристики" loading={entities === 0}>
							{ Object.keys(entities).length > 0 ?
								<Tabs items={[
									{
										label: 'Параметры',
										index: 0,
										content: <Stat items={this.getStatic()} />
									},
									{
										label: 'Настройки',
										index: 1,
										content: <Stat canReboot={entities.canReboot} canEdit={entities.canEdit} ids={[this.props.match.params.id]} items={this.getSettings()} />
									},
								]} />
							: null }
						</Paper>
                    </Col>
					{/*<Stat
									ids={[entities.RigID]}
									title="Характеристики"
									items={entities.Config}
									canReboot={entities.canReboot}
									canEdit={entities.canEdit}
									advanced={[
										{
											name: 'Состояние',
											items: [
												{
													Name: 'State',
													Description: '',
													Value:
														entities.IsOnline ?
															<div style={{color: theme.notifications.success}}>В сети</div> :
															<div style={{color: theme.notifications.error}}>Оффлайн</div>
													,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'Status',
													Description: 'Состояние',
													Value:
														<div>
															<div>
																{ entities.IsMining ?
																	<span style={{color: theme.notifications.success}}>Майнинг</span> :
																	<span style={{color: theme.notifications.error}}>Простой</span>
																}
																<Tag type="hidden">{ moment.duration(entities.miningTime, 'seconds').humanize() }</Tag>
															</div>
														</div>,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'StateStr',
													Description: 'Статус',
													Value: <div>
														<span style={{color: theme.notifications.hidden}}>{ entities.StateStr }</span>
														<Tag type="hidden">{ moment.duration(entities.stateTime, 'seconds').humanize() }</Tag>
													</div>,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'Speed',
													Description: 'Скорость',
													Value: hashrate(entities.HashRate),
													readOnly: true,
													Miners: null
												},
												{
													Name: 'State',
													Description: entities.IsOnline ? 'Uptime' : 'Downtime',
													Value: time.humanize(false),
													readOnly: true,
													Miners: null
												},
											]

										},
										{
											name: 'Оборудование',
											items: [
												{
													Name: 'Mainboard',
													Value: entities.Mainboard,
													Description: 'Материнская плата',
													readOnly: true,
													Miners: null
												},
												{
													Name: 'CPU',
													Value: entities.CPU,
													Description: 'Процессор',
													readOnly: true,
													Miners: null
												},
												{
													Name: 'CPU',
													Value: memory(entities.RAM) ,
													Description: 'Оперативная память',
													readOnly: true,
													Miners: null
												},
												{
													Name: 'CPU',
													Value: `${entities.Driver} ${entities.GpuCount} шт.`,
													Description: 'Процессор',
													readOnly: true,
													Miners: null
												},
											]
										},
										{
											name: 'Параметры',
											items: [
												{
													Name: 'IP',
													Description: 'IP',
													Value: entities.ip,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'Pool',
													Description: 'Pool',
													Value: entities.Pool,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'RunMode',
													Description: 'Режим',
													Value: entities.RunMode,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'Coin',
													Description: 'Coin',
													Value: entities.Coin,
													readOnly: true,
													Miners: null
												},
												{
													Name: 'Wallet',
													Description: 'Кошелек',
													Value: entities.Wallet,
													readOnly: true,
													Miners: null
												},
											]
										}
									]}
								/>*/}
                    <Col xs={12} lg={6}>
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
                <Row>
                    { Object.keys(this.props.rig.charts).length > 0 ? Object.keys(this.props.rig.charts.Hashrate).map((chart, index) => (
                        <HashrateChart key={index} chart={this.getInfoChart(this.props.rig.charts.Hashrate[chart])} title={chart} />
                    )) : null }
                </Row>

            </div>
        );
    }
}