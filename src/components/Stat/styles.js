import styled from 'styled-components';
import { lighten, rem, rgba, transitions } from 'polished';
import CheckIcon from 'react-icons/lib/fa/check';
import ErrorIcon from 'react-icons/lib/fa/close';

export const Container = styled.div`
	margin-bottom: 20px;
	
	.content {
  		margin-top: auto;
 	}
`;

export const Header = styled.div`
  display:flex;
  flex-direction: column;
  
  padding: 20px;
  
  background: linear-gradient(45deg, ${ props => props.theme.notifications[props.type] }, ${ props => lighten(0.05, props.theme.notifications[props.type]) });
`;

export const Title = styled.div`
  font-size: ${ rem('20px') };
  font-weight: 500;
  color: ${ props => props.theme.colors.base.white };
  letter-spacing: 1.4px;
  margin-bottom: 50px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tab = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

	margin: 0 10px;
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
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
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
	${ props => props.inline ? 'display: flex; flex-wrap: wrap;' : null };

  padding: 10px 0;
  
  word-wrap: break-word;
  
  border-bottom: 1px solid ${ props => rgba(props.theme.stat.title, 0.3) };
  
  &:last-child {
    border-bottom: 0;
  }
  
  input, select, textarea {
  	width: 100%;
  	max-width: 300px;
  	padding: 5px 10px;
  	border: 1px solid ${ props => rgba(props.theme.colors.base.black, 0.3) };
  	font-size: ${ rem('13px') };
  }
  
  textarea {
  	height: 150px;
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

export const ItemPlaceholder = styled.span`
	font-weight: 300;
	font-size: ${ rem('15px') };
	color: ${ props => rgba(props.theme.stat.text, 0.8) };
`;

export const Check = styled(CheckIcon)`
	color: ${ props => props.theme.notifications.success };
`;

export const Error = styled(ErrorIcon)`
	color: ${ props => props.theme.notifications.error };
`;

export const EnabledBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-left: auto;
	margin-top: -18px;
`;

export const EnabledLabel = styled.span`
	margin-right: 10px;
	
	margin-bottom: 5px;
    font-weight: 500;
    color: ${ props => rgba(props.theme.stat.text, 0.8) };
	
	font-size: ${ rem('13px') };
`;