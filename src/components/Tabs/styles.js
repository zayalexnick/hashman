import styled from 'styled-components';
import { rgba, rem, transitions } from 'polished';

export const Tabs = styled.div`
  
`;

export const Navigation = styled.div`
  display: flex;
  
  padding: 0 15px;
  
  border-bottom: 1px solid ${ props => rgba(props.theme.colors.base.black, 0.2) };
`;

export const NavItem = styled.div`
  margin-right: 25px;
  margin-bottom: -1px;
  padding: 10px 0;
  
  font-size: ${ rem('14px') };

  cursor: pointer;
  
  color: ${ props => props.active ? props.theme.notifications.primary : props.theme.colors.base.dark };
  
  ${ props => transitions(`color ${props.theme.variables.animation.speed}`) };
  
  border-bottom: ${ props => props.active ? `1px solid ${ props.theme.notifications.primary }` : 0 };
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    color: ${ props => props.theme.notifications.primary };
  }
`;

export const Content = styled.div`
  
`;