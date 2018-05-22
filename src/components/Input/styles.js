import styled from 'styled-components';
import * as Colors from 'constants/Colors';

export const Input = styled.input`
    padding: 4px 10px;
    width: 100%;
    height: 35px;
    cursor: text;
    text-align: left;
    font-size: 13px;
    line-height: 1.5;
    color: #595959;
    background-color: ${Colors.white};
    background-image: none;
    border: 1px solid ${Colors.gray};
    border-radius: 4px;
    transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
`;