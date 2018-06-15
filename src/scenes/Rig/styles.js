import styled from 'styled-components';
import { rem } from 'polished';
import DefaultButton from '~/components/Button';

export const Buttons = styled.div`
  display: flex;
`;

export const Button = styled(DefaultButton)`
  display: flex;
  align-items: center;
  
  margin-right: 5px;
  
  &:last-child {
    margin-right: 0;
  }

  .icon {
    display: flex;
    
    font-size: ${ rem('20px') };
  }

  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.xs })
  {
    span {
      display: none;
    }
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.bg })
  {
    span {
      display: flex;
    }
    
    .icon {
      margin-right: 4px;
    }
  }
`;