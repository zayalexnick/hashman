import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';
import Tag from '~/components/Tag';
import hashrate from '~/utils/hashrate';
import temperature from '~/utils/temperature';
import typeFromNumber from '~/utils/typeFromNumber';
import Button from "~/components/Button";
import Stat from '~/components/Stat';
import _ from "lodash";
import Modal from '~/components/Modal';

@hot(module)
@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class extends Component
{
	state = {
		update: null,
		editMode: false,
		ids: []
	};

    componentDidMount()
    {
        this.props.getRigs(this.props.server.ServerID);
        this.props.getCharts(this.props.server.ServerID);
        this.setState({ update: setInterval(() => {
            this.props.getRigs(this.props.server.ServerID);
            this.props.getCharts(this.props.server.ServerID);
        }, 5000)});
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
        this.props.rigsClear();
    }

	reboot = async (ids) => {
		await this.props.reboot(ids);

		if (this.props.rigs.error.code < 0) console.error('Reboot', this.props.rigs.error.message);
		else console.warn('Reboot', 'OK');
	};

    edit = async (ids) => {
    	clearInterval(this.state.update);

		await this.props.getGConfig(ids);
		this.openStat(ids);
	};

    openStat = (ids) => {
    	this.setState({ editMode: true, ids });
	};

	getSettings = () => {
		const items = [];
		const group = {};

		_.map(this.props.rigs.gconfig, (item) => {
			if (!group[item.Group]) group[item.Group] = [];
			group[item.Group].push(item);
		});

		return group;
	};

    render()
    {
        const { rigs } = this.props;

        return (
            <LoaderContainer loading={rigs.entities.length === 0}>
                { rigs.entities.length > 0 ? (
                    <Table
						selected
						footer={(props) =>
								(
									<div style={{ display: 'flex' }}>
										<Button disabled={props.selectedColumns.length === 0} type="primary" onClick={() => this.edit(props.selectedColumns)}>Редактировать</Button>
										<Button disabled={props.selectedColumns.length === 0} type="warning" onClick={() => this.reboot(props.selectedColumns)}>Перезагрузить</Button>
									</div>
								)
						}
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
                            },
                            {
                                label: 'Статус',
                                index: 'StateStr',
                                render: (value, record) => <Tag type="hidden">{ value }</Tag>,
                                filtered: true
                            },
                            {
                                label: 'Режим',
                                index: 'RunMode',
                                render: (value, record) => <Tag type="hidden">{ value }</Tag>,
                                filtered: true
                            },
                            {
                                label: 'Температура',
                                index: 'MaxTemp',
                                render: (value, record) => <Tag type="hidden">{ temperature(value) }</Tag>,
                                sorter: true
                            },
                            {
                                label: 'Хэшрейт',
                                index: 'Hashrate',
                                render: (value, record) => <Tag type="hidden">{ hashrate(value) }</Tag>,
                                sorter: true,
                                compare: (a, b) => a.Hashrate - b.Hashrate
                            },
                        ]}
                        dataSource={rigs.entities[0].Rigs}
                        pagination={true}
						onRowClick={(record) => this.props.history.push(`/rig/${record.RigID}`)}
                    />
                ) : null }
				{ this.state.editMode ? <Modal unMount={() => this.setState({ editMode: false })} loading={this.props.rigs.pending.loading}><Stat editMode canReboot={rigs.entities.canReboot} canEdit={rigs.entities.canEdit} ids={this.state.ids} items={this.getSettings()} /></Modal> : null }
            </LoaderContainer>
        );
    }
}