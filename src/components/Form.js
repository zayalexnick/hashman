import styled from 'styled-components';
import { rem, transitions } from 'polished';

export const Input = styled.input`
  padding: 12px 10px;

  font-size: ${ rem('13px') };
  color: ${ props => props.theme.colors.base.black };

  border: 1px solid ${ props => props.theme.colors.form.input.border };
  border-radius: 4px;
  
  background: none;
  
  ${ props => transitions(`border-color ${ props.theme.variables.animation.speed }`) };
  
  &:focus {
    border-color: ${ props => props.theme.colors.form.input.focused };
  }
`;