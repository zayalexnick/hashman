import React, { Component } from 'react';
import { Filter, FilterIcon, FilterModal } from './styles';

export default class extends Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state = {
            data: this.props.data,
            opened: false
        };
    }

    render()
    {
        return (
            <Filter>
                <FilterIcon onClick={() => this.setState({ opened: true })} />
                <FilterModal opened={this.state.opened}>
                    { Object.keys(this.state.data).map((item, index) => (
                        <label key={index}><input type="checkbox" onChange={(e) => this.props.change(item, e)} /> {item} ({ this.state.data[item] })</label>
                    )) }
                </FilterModal>
            </Filter>
        );
    }
}