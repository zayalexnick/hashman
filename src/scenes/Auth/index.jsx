import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

type Props = {};

@connect((state) => ({
    auth: state.auth
}), actions)
export default class extends Component<Props>
{
    componentDidMount()
    {
        this.props.signin({ login: 'react', password: '12345' });
    }

    render()
    {
        return (
            <div>Auth</div>
        );
    }
}