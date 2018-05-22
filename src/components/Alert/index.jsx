import React, { Component } from 'react';
import { Alert as AlertUI } from './styles';

type Props = {
    message: string,
    closed: boolean
};

export default class Alert extends Component<Props>
{

    render()
    {
        const { message, closed } = this.props;

        if (closed)
            return null;

        return <AlertUI>{message}</AlertUI>;
    }

}
