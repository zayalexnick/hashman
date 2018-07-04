import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content, Item, Title, Text, Buttons, Check, Error } from './styles';
import Tabs from '~/components/Tabs';
import Button from "~/components/Button";
import { Toggle } from "~/components/Form";

export default class extends Component
{
	static defaultProps = {
		items: {},
		editable: false,
		canReboot: false,
		canEdit: false
	};

	constructor(props, context)
	{
		super(props, context);

		this.state = {
			items: this.props.items,
			copy: this.props.items,
			editMode: false
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
							</Item>
						: null)
					}
					{ !this.props.editable ? (
						<Item>
							{ this.state.editMode ? (
								<Buttons>
									<Button type="success">Сохранить</Button>
									{ this.props.canReboot ? <Button type="warning">Перезагрузить</Button> : null }
									<Button type="error" onClick={() => this.setState({ editMode: !this.state.editMode  })}>Отмена</Button>
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