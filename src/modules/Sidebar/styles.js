import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import * as Colors from 'constants/Colors';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 ${props => props.active ? '240px' : 0};
    max-width: ${props => props.active ? '240px' : 0};
    min-width: ${props => props.active ? '240px' : 0};
    width: ${props => props.active ? '240px' : 0};
    z-index: 1000;
    background: ${Colors.sidebar};
    overflow: hidden;
`;

export const Logo = styled(Link)`
    padding: 24.5px 10px;
    font-size: 21px;
    color: ${Colors.white};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 300;
    text-align: center;
    text-decoration: none;
    background: rgba(0,0,0,0.3);
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px 0;
`;

export const MenuItem = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    text-decoration: none;
    transition: all 0.1s;
    transition-delay: 0;
    font-size: 15px;
    font-weight: 400;
    
    &:hover *, &.active * {
        color: ${Colors.white};
    }
    
    &:hover, &.active {
        background: rgba(0,0,0,0.3);
    }
`;

export const Icon = styled.span`
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-size: 19px;

    * {
        color: ${Colors.navlink};
    }
`;

export const Label = styled.span`
    color: ${Colors.navlink};
`;