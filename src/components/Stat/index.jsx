import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content, Item, Title, Text, Buttons, Check, Error, Different } from './styles';
import Tabs from '~/components/Tabs';
import Button from "~/components/Button";
import { Toggle } from "~/components/Form";
import { connect } from 'react-redux';
import * as actions from '~/scenes/Rigs/actions';

@connect((state) => ({
	rigs: state.rigs
}), actions)
export default class extends Component
{
	static defaultProps = {
		items: {},
		editable: false,
		canReboot: false,
		canEdit: false,
		editMode: false
	};

	constructor(props, context)
	{
		super(props, context);

		this.state = {
			items: this.props.items,
			copy: this.props.items,
			editMode: this.props.editMode
		}
	}

	renderEdit = (item, rootItem, index) => {
		switch (item.Type) {
			case 'bool': return <Toggle checked={item.Value} onChange={() => this.changeItem(item, rootItem, index, !item.Value)} />;
			case 'text': return <input type="text" value={item.Value || ''} placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'int': return <input type="number" value={item.Value || ''} placeholder={item.DefaultValue} min={item.MinValue} max={item.MaxValue} step={item.StepValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'textarea': return <textarea placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}>{item.Value || ''}</textarea>;
			case 'select': return <select value={item.Value} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}><option value={false}>---</option>{ Object.keys(item.SelectParams).map((param, paramIndex) => <option key={paramIndex} value={param}>{item.SelectParams[param]}</option>) }</select>;
			default: return <div>---</div>;
		}
	};

	changeItem = (item, rootItem, index, value) => {
		const newGroup = [];

		this.state.copy[rootItem].map((field, fieldIndex) => {
			newGroup.push(fieldIndex === index ? { ...field, Value: value || null } : field);
		});

		this.setState({ copy: { ...this.state.copy, [rootItem]: newGroup } });
	};

	reboot = async () => {
		await this.props.reboot(this.props.ids);

		if (this.props.rigs.error.code < 0) console.error('Reboot', this.props.rigs.error.message);
		else console.warn('Reboot', 'OK');
	};

	edit = async () => {
		const { copy } = this.state;

		const result = [];

		Object.keys(copy).map((group) => {
			_.map(copy[group], (item) => {
				result.push({ name: item.Name, value: item.Value, isEnabled: item.isEnabled });
			})
		});

		await this.props.edit(this.props.ids, result);

		if (typeof this.props.rigs.config === 'string') console.error('Edit', this.props.rigs.config);
		else console.warn('Edit', 'OK');
	};

	getItems = () => {
		const items = [];
		_.map(Object.keys(this.state.copy), (item, index) =>
			items.push({
				label: item,
				index: index,
				content: <Content>
					{ _.map(this.state.copy[item], (subitem, subindex) =>
						(subitem.Miners === null || subitem.Miners.includes(this.state.copy['Майнинг'].filter(item => item.Name === 'RUN')[0].Value)) ?
							<Item key={subindex}>
								<Title>{subitem.Description}</Title>
								{ this.state.editMode ? this.renderEdit(subitem, item, subindex) : <Text>{subitem.Type === 'select' ? subitem.SelectParams[subitem.Value] :  subitem.Type === 'bool' ?  subitem.Value ? <Check /> : <Error /> : subitem.Value || '---'}</Text> }
								{ subitem.isDifferent ? <Different>Настройки отличаются</Different> : null }
							</Item>
						: null)
					}
					{ !this.props.editable ? (
						<Item>
							{ this.state.editMode ? (
								<Buttons>
									<Button type="success" onClick={this.edit}>Сохранить</Button>
									{ this.props.canReboot ? <Button type="warning" onClick={this.reboot}>Перезагрузить</Button> : null }
									<Button type="error" onClick={() => this.setState({ editMode: !this.state.editMode, copy: this.state.items })}>Отмена</Button>
								</Buttons>
							) : (
								<Buttons>
									{ this.props.canEdit ? <Button type="success" onClick={() => this.setState({ editMode: !this.state.editMode })}>Редактировать</Button> : null }
								</Buttons>
							) }
						</Item>
					) : null }
				</Content>
			})
		);

		return items;
	};

	render()
	{
		return (
			<Container>
				<Tabs items={this.getItems()} />
			</Container>
		);
	}
}