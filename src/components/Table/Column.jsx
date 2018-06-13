import React, { Component } from 'react';
import { Column } from './styles';

export default class extends Component
{
    static defaultProps = {
        render: (value, record) => value,
        compare: (a, b) => a - b
    };

    render()
    {
        return (
            <Column>{ this.props.render(this.props.record[this.props.index], this.props.record) }</Column>
        );
    }
}