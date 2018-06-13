import React, { Component } from 'react';
import * as AccountPanel from './styles';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

type Props = {
    fullname: string,
    logout: () => {}
};

@hot(module)
export default class extends Component<Props>
{
    render()
    {
        return (
            <AccountPanel.Wrapper>
                <AccountPanel.Username>{ this.props.fullname }</AccountPanel.Username>
                <AccountPanel.Logout onClick={this.props.logout} />
            </AccountPanel.Wrapper>
        );
    }
}