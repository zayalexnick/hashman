import styled from 'styled-components';
import * as Colors from 'constants/Colors';

export const Layout = styled.div`
    display: flex;
    height: 100vh;
`;

export const Content = styled.div`
    width: 100%;
    margin-top: 70px;
    padding: 40px 20px;
    background: ${Colors.bg};
    
    @media screen and (max-width: 768px) {
    padding: 20px 10px;
    }
`;