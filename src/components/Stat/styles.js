import styled from 'styled-components';
import { lighten, rem, rgba, transitions } from 'polished';

export const Container = styled.div`

`;

export const Header = styled.div`
  display:flex;
  flex-direction: column;
  
  height: 200px;
  
  padding: 20px;
  
  background: linear-gradient(45deg, ${ props => props.theme.notifications[props.type] }, ${ props => lighten(0.05, props.theme.notifications[props.type]) });
`;

export const Title = styled.div`
  font-size: ${ rem('20px') };
  font-weight: 500;
  color: ${ props => props.theme.colors.base.white };
  letter-spacing: 1.4px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-around;

  margin-top: auto;
`;

export const Tab = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;
  
  color: ${ props => props.active ? props.theme.notifications[props.type] : rgba(props.theme.colors.base.white, 0.7) };
  
  border-radius: 5px;
  border: 1px solid ${ props => props.active ? props.theme.notifications[props.type] : rgba(props.theme.colors.base.white, 0.7) };
  
  background: ${ props => props.active ? props.theme.colors.base.white : 'none' };
  
  ${ props => transitions(`border-color ${ props.theme.variables.animation.speed }`, `color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.active ? props.theme.notifications[props.type] : props.theme.colors.base.white };
    border-color: ${ props => props.theme.colors.base.white };
  }
`;

export const Icon = styled.div`
  margin-bottom: 10px;

  font-size: ${ rem('30px') };
`;

export const Body = styled.div`
  padding: 0 20px;
  
  background: ${ props => props.theme.colors.base.white };
`;

export const Item = styled.div`
  padding: 10px 0;
  
  word-wrap: break-word;
  
  border-bottom: 1px solid ${ props => rgba(props.theme.stat.title, 0.3) };
  
  &:last-child {
    border-bottom: 0;
  }
`;

export const ItemTitle = styled.h3`
  margin-bottom: 5px;

  font-size: ${ rem('13px') };
  font-weight: 500;
  color: ${ props => props.theme.stat.title };
`;

export const ItemText = styled.div`
  font-size: ${ rem('17px') };
  font-weight: 600;
  color: ${ props => props.theme.stat.text };
`;