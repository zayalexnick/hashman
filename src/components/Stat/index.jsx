import React, { Component } from 'react';
import _ from 'lodash';
import Button from '~/components/Button';
import { Toggle } from '~/components/Form';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Header, Title, Tabs, Tab, Icon, Body, Item, ItemTitle, ItemText, ItemPlaceholder, Check, Error, EnabledBlock, EnabledLabel } from './styles';
import MdMemory from 'react-icons/lib/md/memory';
import FaClock from 'react-icons/lib/fa/clock-o';
import FaCogs from 'react-icons/lib/fa/cogs';
import FaFolder from 'react-icons/lib/fa/folder-o';
import FaDashboard from 'react-icons/lib/fa/dashboard';
import FaDatabase from 'react-icons/lib/fa/database';

export default class extends Component
{
    static defaultProps = {
        type: 'primary',
		items: [],
		copy: [],
		canReboot: false,
		canEdit: false,
		advanced: {},
		title: 'Статистика'
    };

	constructor(props, context)
	{
		super(props, context);

		let newItems = {};

		this.props.advanced.map((item) => {
			newItems[item.name] = item.items;
		});

		_.map(this.props.items, (item, index) => {
			if (!newItems[item.Group]) newItems[item.Group] = [];
			newItems[item.Group].push(item);
		});

		this.state = { current: 0, items: newItems, copy: newItems, edit: false, canReboot: this.props.canReboot, canEdit: this.props.canEdit };
	}

	changeEnabled = (item, index) => {
		const currentGroup = this.state.copy[Object.keys(this.state.copy)[this.state.current]];

		const newGroup = [];
		currentGroup.map((element) => {
			if (element.Name === item.Name) newGroup.push({ ...item, isEnabled: !item.isEnabled });
			else newGroup.push(element);
		});

		this.setState({ copy: { ...this.state.copy, [Object.keys(this.state.copy)[this.state.current]]: newGroup } });
	};

	changeItem = (item, index, value) => {
		const currentGroup = this.state.copy[Object.keys(this.state.copy)[this.state.current]];

		const newGroup = [];
		currentGroup.map((element) => {
			if (element.Name === item.Name) newGroup.push({ ...item, Value: value });
			else newGroup.push(element);
		});

		this.setState({ copy: { ...this.state.copy, [Object.keys(this.state.copy)[this.state.current]]: newGroup } });
	};

	renderEnabled = (item, index) => {
		const currentItem = this.state.copy[Object.keys(this.state.copy)[this.state.current]][index];
		return currentItem.useEnabled ? (
			<EnabledBlock>
				<EnabledLabel>Использовать:</EnabledLabel>
				<Toggle checked={currentItem.isEnabled} onChange={() => this.changeEnabled(item, index)} />
			</EnabledBlock>
		) : null;
	};

	renderEditField = (item, index) => {
		const currentItem = this.state.copy[Object.keys(this.state.copy)[this.state.current]][index];
		switch (item.Type) {
			case 'bool': return <Toggle checked={currentItem.Value} onChange={() => this.changeItem(item, index, !currentItem.Value)} />;
			case 'int': return <input type="number" min={currentItem.MinValue} max={currentItem.MaxValue} step={currentItem.StepValue} placeholder={currentItem.DefaultValue} value={currentItem.Value} onChange={(e) => this.changeItem(item, index, e.target.value)} />;
			case 'text': return <input type="text" value={currentItem.Value} placeholder={currentItem.DefaultValue} onChange={(e) => this.changeItem(item, index, e.target.value)} />;
			case 'textarea': return <textarea placeholder={currentItem.DefaultValue} onChange={(e) => this.changeItem(item, index, e.target.value)}>{currentItem.Value}</textarea>;
			case 'select': return <select value={currentItem.Value} placeholder={currentItem.DefaultValue} onChange={(e) => this.changeItem(item, index, e.target.value)}><option value={null}>---</option>{ Object.keys(currentItem.SelectParams).map((item, index) => <option key={index} value={item}>{ currentItem.SelectParams[item] }</option>) }</select>;
			default: return <ItemPlaceholder>---</ItemPlaceholder>;
		}
	};

	icons = () => {
		return {
			'Оборудование': <MdMemory />,
			'Состояние': <FaClock />,
			'Параметры': <FaCogs />,
			'Основные': <FaFolder />,
			'Разгон': <FaDashboard />,
			'Майнинг': <FaDatabase />
		};
	};

    render()
    {
        const { title, type } = this.props;
        const { current, copy, edit, canReboot, canEdit } = this.state;

        return (
            <Container>
                <Header type={type}>
                    <Title>{ title }</Title>
					<Scrollbars
						universal
						autoHeight
						autoHide
					>
						<Tabs>
							{ Object.keys(copy).map((item, index) => (
								<Tab key={index} type={type} active={index === current} onClick={() => this.setState({ current: index })}>
									<Icon>{ this.icons()[item] }</Icon>
									{ item }
								</Tab>
							)) }
						</Tabs>
					</Scrollbars>
                </Header>
				<Body>
                    { copy[Object.keys(copy)[current]].map((item, index) => {
                    	if (item.Miners === null || item.Miners.includes(copy['Майнинг'].filter(item => item.Name === 'RUN')[0].Value))
							return (
								<Item key={index}>
									<ItemTitle>{ item.Description }</ItemTitle>
									{!edit || item.readOnly ? (
										<ItemText>{ item.Type === 'bool' ? item.Value ? <Check /> : <Error /> : item.Value || (<ItemPlaceholder>---</ItemPlaceholder>)}</ItemText>
									) : (
										<div style={{ display: 'flex' }}>
											{ this.renderEditField(item, index) }
											{ this.renderEnabled(item, index) }
										</div>
									) }
								</Item>
							);
                    	else return null;
                    }) }
					{ !edit ? (
						<Item inline>
							{ canEdit ? <Button type="primary" onClick={() => this.setState({ edit: !edit })}>Редактировать</Button> : null }
							{ canReboot ? <Button type="warning" onClick={() => this.setState({ edit: !edit })}>Перезагрузить</Button> : null }
						</Item>
					) : (
						<Item inline>
							<Button type="success" onClick={() => this.setState({ edit: !edit })}>Сохранить</Button>
							{canReboot ? <Button type="warning" onClick={() => this.setState({ edit: !edit })}>Сохранить с перезагрузкой</Button> : null }
							<Button type="error" onClick={() => this.setState({ copy: this.state.items, edit: !edit })}>Отмена</Button>
						</Item>
					) }
                </Body>
            </Container>
        );
    }
}