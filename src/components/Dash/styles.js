import styled from 'styled-components';
import * as Colors from 'constants/Colors';

export const Dash = styled.div`
    display: flex;
    flex-direction: column;
    background: ${Colors.white};
    border-radius: 4px;
    box-shadow: 0 0 1px rgba(0,0,0,0.3);
    margin: 0 15px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    color: ${props => props.colorHeader};
    background: ${props => props.backgroundHeader};
    letter-spacing: 1.2px;
    height: 64px;
    line-height: 1.2;
`;

export const Title = styled.div`
    color: '#323232';
    font-weight: bold;
    font-size: 18px;
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 50px;
`;

export const Body = styled.div`
    padding: 20px 15px;
`;