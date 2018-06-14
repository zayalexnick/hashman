import React, { Component } from 'react';
import { Tabs, Navigation, NavItem, Content } from './styles';

export default class extends Component
{
    state = {
        current: 0
    };

    componentDidMount()
    {
        this.setState({ current: parseInt(this.props.activeItem) || this.props.items[0].index });
    }

    clickHandler = (index) => {
        this.setState({ current: index });
    };

    getCurrent = () => this.props.items.filter((item) => item.index === this.state.current)[0] || null;

    render()
    {
        const { items } = this.props;

        return (
            <Tabs>
                <Navigation>
                    { items.map((item) => <NavItem key={item.index} active={this.state.current === item.index} onClick={() => this.clickHandler(item.index)}>{ item.label }</NavItem>) }
                </Navigation>
                <Content>
                    { this.getCurrent() ? this.getCurrent().content : null }
                </Content>
            </Tabs>
        );
    }
}