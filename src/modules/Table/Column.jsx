import React, { Component } from 'react';
import { Column } from './styles';

export default class extends Component
{
    state = {
        before: (value) => value
    };

    componentDidMount()
    {
        this.setState(this.props);
    }

    render()
    {
        return (
            <Column>{ this.state.before(this.props.text) }</Column>
        );
    }
}