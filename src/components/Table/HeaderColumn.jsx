import React, { Component } from 'react';
import { Column, Sorter } from './styles';

export default class extends Component
{
    static defaultProps = {
        sorter: false,
        compare: (a, b) => a - b
    };

    render()
    {
        const { label, sorter, index, compare, compareBy, sorterColumn } = this.props;

        return (
            <Column>
                <span>{ label }</span>
                { sorter ? <Sorter active={(sorterColumn === index).toString()} onClick={() => compareBy(index, compare)} /> : null }
            </Column>
        );
    }
}