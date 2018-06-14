import React, { Component } from 'react';
import { Column } from './styles';

export default class extends Component
{
    static defaultProps = {
        render: (value, record) => value,
        compare: (a, b) => a - b
    };

    state = {

    };

    componentDidMount()
    {
        this.setState({ ...this.props.onRow(this.props.record) });
    }

    render()
    {
        return (
            <Column styles={this.state.styles}>{ this.props.render(this.props.record[this.props.index], this.props.record) }</Column>
        );
    }
}