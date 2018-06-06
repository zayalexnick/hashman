import React, {Component} from 'react';
import { Wrapper, IconButton, IconLink, User } from './styles';
import ToggleIcon from 'react-icons/lib/io/android-menu';
import LogoutIcon from 'react-icons/lib/io/log-out';
import { connect } from "react-redux";
import * as actions from 'modules/Sidebar/actions';

type Props = {
    active: boolean,
    toggleSidebar: () => {}
}

@connect((state) => ({
    auth: state.auth,
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
                <User>{this.props.auth.fullname}</User>
                <IconLink to="/auth/logout">
                    <LogoutIcon />
                </IconLink>
            </Wrapper>
        );
    }
}