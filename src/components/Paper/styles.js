import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Title = styled.h2`
  margin-bottom: 20px;

  font-size: ${ rem('18px') };
  font-weight: 500;
  color: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.dark };
`;

export const Container = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  
  background: ${ props => props.theme.colors.base.white };
  
  box-shadow: 0 1px 15px 1px ${ props => rgba(props.theme.colors.base.black, 0.08) };
`;

export const Subes = styled.div`
  margin-bottom: 10px;
`;