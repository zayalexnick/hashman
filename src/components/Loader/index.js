import styled, { keyframes } from 'styled-components';
import * as Colors from 'constants/Colors';

const anim = keyframes`
    0% {
        transform: rotate(0deg);
    }
        100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid ${Colors.red};
    transform: translateZ(0);
    animation: ${anim} 1.1s infinite linear;
    
    &, &:after {
        border-radius: 50%;
        width: 4em;
        height: 4em;
    }
    
    &:before, &:after {
        position: absolute;
        top: 0;
        content: '';
    }
    
    &:before {
        left: -1em;
        animation-delay: -0.32s;
    }
    
    &:after {
        left: 1em;
    }
`;

export const LoaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: ${props => props.visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 2;
`;