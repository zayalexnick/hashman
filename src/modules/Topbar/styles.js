import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import * as Colors from 'constants/Colors';


export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 10px 31px 10px ${props => props.active ? '265px' : '31px'};
    z-index: 900;
`;

export const IconButton = styled.button`
    display: flex;
    color: ${Colors.black};
    font-size: 22px;
    background: none;
    border: 0;
    outline: none;
    cursor: pointer;
    ${props => props.toggle ? 'margin-right: auto' : ''}
`;

export const IconLink = styled(Link)`
    display: flex;
    color: ${Colors.black};
    font-size: 22px;
    cursor: pointer;
    text-decoration: none
    ${props => props.toggle ? 'margin-right: auto' : ''}
`;