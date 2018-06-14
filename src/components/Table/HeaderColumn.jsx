import React, { Component } from 'react';
import _ from 'lodash';
import { Column, Sorter } from './styles';
import Filter from './Filter';

export default class extends Component
{
    static defaultProps = {
        sorter: false,
        filtered: false
    };

    change = (item, e) => {
        if (e.target.checked)
            this.props.addFilter({ filter: item, filterFunc: (record) => record[this.props.index].includes(item) })
        else
            this.props.removeFilter(item);
    };

    render()
    {
        const { label, sorter, filtered, index, filter, compare, compareBy, sorterColumn, source } = this.props;

        return (
            <Column>
                <span>{ label }</span>
                { sorter ? <Sorter active={(sorterColumn === index).toString()} onClick={() => compareBy(index, compare)} /> : null }
                { filtered ? <Filter data={_.countBy(source, index)} change={this.change} /> : null }
            </Column>
        );
    }
}