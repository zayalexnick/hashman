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
import { Message as MessageStat } from '~/components/Stat/styles';

@hot(module)
@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class extends Component
{
	state = {
		update: null,
		editMode: false,
		ids: [],
		messageType: null,
		showMessage: false,
		message: '',
		messageDelay: null,
	};

    async componentDidMount()
    {
        this.props.getRigs(this.props.server.ServerID);
        await this.props.getCharts(this.props.server.ServerID);

        if (this.props.rigs.error.message === 'NOT DATA') {
        	this.props.showCharts();
		}

        this.setState({ update: setInterval(() => {
            this.props.getRigs(this.props.server.ServerID);
            this.props.getCharts(this.props.server.ServerID);
        }, 5000)});
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
        this.props.rigsClear();
        console.log('UNMOUNT');
    }

	_showMessage = (type, message) => {
		clearTimeout(this.state.messageDelay);
		this.setState({ messageType: type, showMessage: true, message });

		this.setState({ messageDelay: setTimeout(() => this.setState({ showMessage: false }), 10000) });
	};

	reboot = async (ids) => {
		if(confirm('Вы действительно хотите изменить и перезапустить выбранные устройства?')) {
			this.setState({showMessage: false});
			await this.props.reboot(ids);

			if (typeof this.props.rigs.config === 'string')
				this._showMessage('error', this.props.rigs.config);
			else
				this._showMessage('success', 'Успешно перезагружено');
		}
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

	editDisabled = (tableProps) => {
		if (tableProps.selectedColumns.length === 0) return true;

		let i = 0;

		_.map(tableProps.copySource, (item) => {
			console.log(item, tableProps.selectedColumns);
			if (tableProps.selectedColumns.includes(item.RigID) && item.canEdit) i++;
		});

		console.log(i);

		return i !== tableProps.selectedColumns.length;
	};

	rebootDisabled = (tableProps) => {
		if (tableProps.selectedColumns.length === 0) return true;

		let i = false;

		_.map(tableProps.copySource, (item) => {
			if (tableProps.selectedColumns.includes(item.RigID) && item.canReboot) i = true;
		});

		return !i;
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
										<Button disabled={this.editDisabled(props)} type="primary" onClick={() => this.edit(props.selectedColumns)}>Редактировать</Button>
										<Button disabled={this.rebootDisabled(props)} type="warning" onClick={() => this.reboot(props.selectedColumns)}>Перезагрузить</Button>
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
                            {
                                label: 'Coin',
                                index: 'Coin',
                                filtered: true
                            },

                        ]}
                        dataSource={rigs.entities[0].Rigs}
                        pagination={true}
						onRowClick={(record) => this.props.history.push(`/rig/${record.RigID}`)}
                    />
                ) : null }
				{ this.state.editMode ? <Modal unMount={() => this.setState({ editMode: false })} loading={this.props.rigs.pending.loading}><Stat editMode canReboot={rigs.entities.canReboot} canEdit={rigs.entities.canEdit} ids={this.state.ids} items={this.getSettings()} onCancel={() => this.setState({ editMode: false })} /></Modal> : null }
				{ this.state.showMessage ? <MessageStat type={this.state.messageType}>{ this.state.message }</MessageStat> : null }
            </LoaderContainer>
        );
    }
}