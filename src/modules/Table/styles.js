import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  
  font-size: ${ rem('15px') };
  color: ${ props => rgba(props.theme.colors.base.black, 0.6) };
  
  background: ${ props => props.theme.colors.base.white };
`;

export const Header = styled.thead`
  font-weight: 500;

  background: ${ props => props.theme.colors.table.header.bg };
`;

export const Body = styled.tbody`
  
`;

export const Row = styled.tr`
  
`;

export const HeaderRow = styled(Row)`
  
`;

export const Column = styled.td`
  padding: 14px 16px;

  border-bottom: 1px solid ${ props => props.theme.colors.table.border };
`;

export const HeaderColumn = styled(Column)`
  
`;