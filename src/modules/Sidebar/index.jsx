/**
    @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Sidebar from './styles';
import FlashIcon from 'react-icons/lib/io/flash';

type Props = {
    logo: any,
    navigate: Array<{
        to: string,
        icon: any,
        label: string
    }>
}

@connect((state) => ({
    sidebar: state.sidebar
}))
export default class extends Component<Props>
{
    render()
    {
        const { logo, navigate } = this.props;
        const { hidden } = this.props.sidebar;

        return (
            <Sidebar.Wrapper hidden={hidden}>
                <Sidebar.Logo to={logo.to}>{ hidden ? <FlashIcon /> : logo.label }</Sidebar.Logo>
                <Sidebar.Content>
                    { navigate.map((item, index) => (
                        <Sidebar.Link key={index} to={item.to} activeClassName="active" hidden={hidden}>
                            <Sidebar.Icon hidden={hidden}><item.icon /></Sidebar.Icon>
                            <Sidebar.Label hidden={hidden}>{item.label}</Sidebar.Label>
                        </Sidebar.Link>
                    )) }
                </Sidebar.Content>
            </Sidebar.Wrapper>
        );
    }
}