import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from './actions';
import { withRouter } from 'react-router-dom';
import { Row, Col } from '~/components/Grid';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';

@hot(module)
@connect((state) => ({
    reports: state.reports,
}), actions)
@withRouter
export default class extends Component
{
    state = {
        update: null,
		activeChart: null,
		showCharts: true
    };

    componentDidMount()
    {
        this.props.getReports();

        this.setState({ update: setInterval(() => this.props.getReports(), 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

	getUptime = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.uptime));

    	return (sum / entities.length).toFixed(1);
	};

	getDowntime = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.downtime));

    	return (sum / entities.length).toFixed(1);
	};

	getIncome = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.income));

    	return sum.toFixed(1);
	};

	getOutcome = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.outcome));

    	return sum.toFixed(1);
	};

    render()
    {
        const { reports } = this.props;

        return (
            <div>
                <Title>Отчёт</Title>
				<Paper title="Отчёты">
					<LoaderContainer loading={reports.entities.length === 0}>
						<Table
							columns={[
								{
									label: 'Рига',
									index: 'RigName',
								},
								{
									label: 'Uptime',
									index: 'uptime',
									render: (value) => value + '%'
								},
								{
									label: 'Downtime',
									index: 'downtime',
									render: (value) => value + '%'
								},
								{
									label: 'Income',
									index: 'income',
								},
								{
									label: 'Outcome',
									index: 'outcome',
								}
							]}
							dataSource={[...reports.entities]}
							pagination={true}
							footer={(props) =>
								(
									<Table
										hideHeader
										columns={[
											{
												label: 'Рига',
												index: 'RigName',
												render: (value) => <div style={{ fontWeight: 'bold !important' }}>{value}</div>
											},
											{
												label: 'Uptime',
												index: 'uptime',
												render: (value) => value + '%'
											},
											{
												label: 'Downtime',
												index: 'downtime',
												render: (value) => value + '%'
											},
											{
												label: 'Income',
												index: 'income',
											},
											{
												label: 'Outcome',
												index: 'outcome',
											}
										]}
										dataSource={[{ RigName: 'Итого', uptime: this.getUptime(), downtime: this.getDowntime(), income: this.getIncome(), outcome: this.getOutcome() }]}
									/>
								)
							}
						/>
					</LoaderContainer>
				</Paper>
            </div>
        );
    }
}