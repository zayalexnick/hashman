import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Wrapper, Logo, Menu, MenuItem, Icon, Label } from './styles';
import items from './navigation';

type Props = {
    active: boolean
};

type ItemProps = {
    to: string,
    label: string,
    icon?: React.Component
}

const Item = (props: ItemProps) => (
    <MenuItem to={props.to} activeClassName="active">
        <Icon>
            <props.icon />
        </Icon>
        <Label>{ props.label }</Label>
    </MenuItem>
);

@connect((state) => ({
    sidebar: state.sidebar
}))
export default class Sidebar extends Component<Props>
{
    render()
    {
        return (
            <Wrapper active={this.props.sidebar.active}>
                <Logo to="/">Hashman</Logo>
                <Scrollbars>
                    <Menu>
                        { items.map((item, index) => <Item key={index} { ...item } />) }
                    </Menu>
                </Scrollbars>
            </Wrapper>
        );
    }
}