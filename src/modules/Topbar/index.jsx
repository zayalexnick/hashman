import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '~/modules/Sidebar/actions';
import * as Topbar from './styles';

import AccountPanel from '~/modules/AccountPanel';

type Props = {

};

@connect((state) => ({
    sidebar: state.sidebar,
}), actions)
export default class extends Component<Props>
{
    render()
    {
        const { toggleSidebar } = this.props;
        const { hidden } = this.props.sidebar;

        return (
            <Topbar.Wrapper hidden={hidden}>
                <Topbar.Toggle onClick={toggleSidebar} />
                <AccountPanel />
            </Topbar.Wrapper>
        );
    }
}