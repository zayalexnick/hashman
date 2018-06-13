import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Title from '~/components/Title';

@hot(module)
export default class extends Component
{
    render()
    {
        return (
            <Title>Устройства</Title>
        );
    }
}