import styled from 'styled-components';
import { rem, lighten, transitions } from 'polished';

export const Default = styled.button`
  display: flex;
  
  padding: 8px 25px;
  
  font-size: ${ rem('14px') };
  font-weight: 500;
  color: ${ props => props.theme.colors.notifications.default };
  
  border-radius: 4px;
  border: 1px solid ${ props => props.theme.colors.notifications.border };
  
  background: ${ props => props.theme.colors.base.white };
  
  ${ props => transitions(`border-color ${ props.theme.variables.animation.speed }`, `color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.theme.colors.notifications.primary };
    border-color: ${ props => props.theme.colors.notifications.primary };
  }
`;

export const Primary = styled(Default)`
  border-color: transparent;
  
  color: ${ props => props.theme.colors.base.white };
  
  background: ${ props => props.theme.colors.notifications.primary };
  
  ${ props => transitions(`background-color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.theme.colors.base.white };
    background: ${ props => lighten(0.05, props.theme.colors.notifications.primary) };
    border-color: ${ props => lighten(0.05, props.theme.colors.notifications.primary) };
  }
`;