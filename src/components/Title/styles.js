import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.h1`
  display: flex;
  align-items: center;
  
  margin-bottom: 30px;
  
  font-weight: 500;
  font-size: ${ rem('19px') };
  color: ${ props => props.theme.colors.title.color };
  
  border-left: 5px solid ${ props => props.theme.colors.title.border };
  
  &:after {
    content: '';
  
    width: 100%;
    height: 1px;
    
    background: ${ props => props.theme.colors.title.border };
  }
`;

export const Text = styled.span`
  padding: 10px 15px;
  
  background: ${ props => props.theme.colors.base.bg };
`;