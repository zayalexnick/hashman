import styled from 'styled-components';
import { rgba, rem, transitions } from 'polished';
import SorterIcon from 'react-icons/lib/fa/sort';

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  
  border-collapse: separate;
  border-spacing: 0;
  word-break: normal;
  
  font-size: ${ rem('13px') };
  
  text-align: left;
`;

export const Row = styled.tr`
  word-break: normal;

  ${ props => transitions(`background-color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    background: ${ props => rgba(props.theme.colors.base.blue, 0.1) };
  }
`;

export const Column = styled.td`
  padding: 5px;
  
  line-height: 1.5;
  word-break: normal;
  
  border-bottom: 1px solid ${ props => props.theme.table.colors.border };
  
  span {
    margin-right: 5px;
  }
`;

export const Header = styled.thead`
  font-weight: 500;

  background: ${ props => props.theme.table.colors.header };
  
  tr, tr:hover {
    background: ${ props => props.theme.table.colors.header };
  }
`;

export const Body = styled.tbody`

`;

export const Sorter = styled(SorterIcon)`
  font-size: ${ rem('11px') };
  color: ${ props => props.active === "true" ? props.theme.table.colors.active : rgba(props.theme.colors.base.dark, 0.6) };

  cursor: pointer;
  
  ${ props => transitions(`color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.active === "true" ? props.theme.table.colors.active : props.theme.colors.base.dark };
  }
`;