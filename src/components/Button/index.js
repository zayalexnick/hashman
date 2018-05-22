import styled from 'styled-components';
import * as Colors from 'constants/Colors';

const Button = styled.button`
    display: inline-block;
    margin-bottom: 0;
    font-weight: 500;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 0 25px;
    font-size: 14px;
    border-radius: 4px;
    height: 36px;
    user-select: none;
    position: relative;
    color: ${Colors.white};
    border-color: ${Colors.gray};
    transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
`;

export const Primary = styled(Button)`
    background-color: ${Colors.lightBlue};
    border-color: ${Colors.lightBlue};
`;