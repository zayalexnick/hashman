import React, { Component } from 'react';
import * as AccountPanel from './styles';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

type Props = {

};

@hot(module)
export default class extends Component<Props>
{
    render()
    {
        return (
            <AccountPanel.Wrapper>
                <AccountPanel.Username>Зайка А.Н.</AccountPanel.Username>
                <AccountPanel.Logout />
            </AccountPanel.Wrapper>
        );
    }
}