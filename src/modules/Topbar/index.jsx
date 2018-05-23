import React, {Component} from 'react';
import { Wrapper, IconButton, IconLink } from './styles';
import ToggleIcon from 'react-icons/lib/io/android-menu';
import LogoutIcon from 'react-icons/lib/io/log-out';
import { connect } from "react-redux";
import * as actions from 'modules/Sidebar/actions';

type Props = {
    active: boolean,
    toggleSidebar: () => {}
}

@connect((state) => ({
    sidebar: state.sidebar
}), actions)
export default class Topbar extends Component<Props>
{
    render()
    {
        return (
            <Wrapper active={this.props.sidebar.active}>
                <IconButton onClick={this.props.toggle} toggle>
                    <ToggleIcon />
                </IconButton>
                <IconLink to="/auth/logout">
                    <LogoutIcon />
                </IconLink>
            </Wrapper>
        );
    }
}