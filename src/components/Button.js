import styled from 'styled-components';
import { rem, lighten, transitions } from 'polished';

export default styled.button`
  display: flex;
  
  padding: 8px 25px;
  
  font-size: ${ rem('14px') };
  font-weight: 500;
  color: ${ props => props.theme.colors.base.white };
  
  border-radius: 4px;
  border: 1px solid ${ props => props.theme.colors.notifications.border };
  
  background: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.notifications.default };;
  
  ${ props => transitions(`border-color ${ props.theme.variables.animation.speed }`, `color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.theme.colors.base.white };
    background: ${ props => lighten(0.05, props.type ? props.theme.notifications[props.type] : props.theme.notifications.default) };
    border-color: ${ props => lighten(0.05, props.type ? props.theme.notifications[props.type] : props.theme.notifications.default) };
  }
`;