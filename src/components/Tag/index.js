import styled from 'styled-components';
import { rem } from 'polished';

export const Group = styled.div`
  display: flex;
  flex-wrap: ${ props => props.inline ? 'nowrap' : 'wrap' }
`;

export default styled.span`
  display: inline-flex;
  margin: 2px 0;
  padding: 4px 7px;

  font-size: ${ rem('12px') };
  color: ${ props => props.theme.colors.base.white };
  
  white-space: nowrap;
  
  background-color: ${ props => props.theme.notifications[props.type] };
`;