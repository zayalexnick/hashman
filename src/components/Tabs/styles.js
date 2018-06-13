import styled from 'styled-components';
import { transitions } from 'polished';

export const Tabs = styled.div`
  
`;

export const Navigation = styled.div`
  display: flex;
  
  border-bottom: 1px solid ${ props => props.theme.notifications.primary };
`;

export const NavItem = styled.div`
  padding: 5px 30px;
  
  font-weight: 500;

  cursor: pointer;
  
  color: ${ props => props.active ? props.theme.notifications.primary : props.theme.colors.base.dark };
  
  ${ props => transitions(`color ${props.theme.variables.animation.speed}`) };
  
  border-bottom: ${ props => props.active ? `3px solid ${ props.theme.notifications.primary }` : 0 };
  
  &:hover {
    color: ${ props => props.theme.notifications.primary };
  }
`;