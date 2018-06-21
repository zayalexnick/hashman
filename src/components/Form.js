import React, { Component } from 'react';
import styled from 'styled-components';
import { rem, transitions, rgba } from 'polished';
import CheckIcon from 'react-icons/lib/fa/check';

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

export const Label = styled.label`
  position: relative;

  display: flex;
  flex-shrink: 0;

  margin-bottom: 5px;
  padding-left: ${ props => props.radio ? '44px' : '30px' };
  
  cursor: pointer;
  
  &:before {
    content: '';
    
    position: absolute;
    top: 0;
    left: 0;
    
    width: 16px;
    height: 16px;
    
    border: 1px solid ${ props => rgba(props.theme.colors.base.dark, 0.3) };
    border-radius: 4px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  span {
    flex-shrink: 0;
    margin-right: 0;
  }
`;

export const Check = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;
  height: 18px;
  
  margin-right: 0 !important;

  font-size: ${ rem('10px') };
  color: ${ props => props.theme.colors.base.white };

  border: 1px solid ${ props => props.theme.notifications.primary };
  border-radius: 4px;
  
  background: ${ props => props.theme.notifications.primary };
  
  opacity: ${ props => props.checked ? 1 : 0 };
  
  ${ props => transitions(`opacity ${props.theme.variables.animation.speed}`) };
`;

export const Radio = styled.label`
  position: relative;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  
  font-size: ${ rem('12px') };
  
  cursor: pointer;
`;

export const ToggleComp = styled.span`
  position: relative;
  
  width: 60px;
  height: 30px;
  
  margin-right: 10px;
  
  border: 1px solid ${ props => rgba(props.theme.colors.base.dark, 0.3) };
  border-radius: 30px;
  
  &:before {
    content: '';
    
    position: absolute;
    top: 2px;
    
    left: ${ props => props.checked ? 'calc(100% - 24px - 3px)' : '3px' };
    ${ props => transitions(`left ${ props.theme.variables.animation.speed }`) };
    
    width: 24px;
    height: 24px;
    
    border-radius: 50%;
    
    background: ${ props => props.theme.notifications.primary };
  }
`;

export class Checkbox extends Component
{
    static defaultProps = {
        checked: false
    };

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            checked: this.props.checked
        }
    }

    _onChange = (e) => {
        this.setState({ checked: !this.state.checked });

        this.props.onChange(e);
    };

    render()
    {
        const { children, name } = this.props;

        return (
            <Label for={name}>
                <Check checked={this.state.checked}><CheckIcon /></Check>
                <span>{ children }</span>
                <input type="checkbox" name={name} id={name} style={{ display: 'none' }} onChange={this._onChange} />
            </Label>
        );
    }
}

export const Toggle = ({ checked, children, onChange }) => (
    <Radio>
        <ToggleComp checked={checked} />
        <span>{ children }</span>
        <input type="checkbox" name={name} id={name} style={{ display: 'none' }} onChange={onChange} />
    </Radio>
);
