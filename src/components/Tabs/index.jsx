import React, { Component } from 'react';
import { Tabs, Navigation, NavItem } from './styles';

export default class extends Component
{
    state = {
        current: 0
    };

    componentDidMount()
    {
        this.setState({ current: this.props.items[0].index })
    }

    clickHandler = (index) => {
        this.setState({ current: index });
    };

    render()
    {
        const { items } = this.props;

        return (
            <Tabs>
                <Navigation>
                    { items.map((item) => <NavItem key={item.index} active={this.state.current === item.index} onClick={() => this.clickHandler(item.index)}>{ item.label }</NavItem>) }
                </Navigation>
            </Tabs>
        );
    }
}