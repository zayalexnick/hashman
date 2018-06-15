import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.h1`
  display: flex;
  align-items: center;
  
  margin-bottom: 30px;
  
  font-weight: 500;
  font-size: ${ rem('19px') };
  color: ${ props => props.theme.colors.title.color };
  
  &:after {
    content: '';
  
    width: 100%;
    height: 1px;
    
    background: ${ props => props.theme.colors.title.border };
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
    border-left: 5px solid ${ props => props.theme.colors.title.border };
  }
`;

export const Text = styled.span`
  flex-shrink: 0;

  padding: 10px 15px 10px 0;
  
  background: ${ props => props.theme.colors.base.bg };
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
    padding-left: 15px;
  }
`;

export const Sub = styled.span`
  margin-left: 5px;

  color: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.notifications.default };
`;

export const Right = styled.div`
  order: 1;
  
  margin-left: auto;
  padding: 10px 0 10px 15px;  
`;