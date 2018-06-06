import styled from 'styled-components';
import bgImage from './assets/sign.jpg';
import * as Colors from 'constants/Colors';
import { Link } from 'react-router-dom';
import InputUI from 'components/Input';

export const SignInStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: ${Colors.bg};
  background-size: cover;

  /*&:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: inherit;
    right: 0;
  }*/
`;

export const LoginContentWrapper = styled.div`
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;  
`;

export const LoginContent = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 70px 50px;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
`;

export const LogoWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 50px;
    justify-content: center;
    flex-shrink: 0;
`;

export const LogoLink = styled(Link)`
    font-size: 24px;
    font-weight: 300;
    line-height: 1;
    text-transform: uppercase;
    color: ${Colors.blue};
    text-decoration: none;
`;

export const SignInForm = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
`;

export const InputWrapper = styled.div`
    margin-bottom: 15px;
    
    &:last-of-type {
      margin-bottom: 0;
    }
`;

export const LeftRightComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const HelperText = styled.div`
    position: relative;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
    color: ${Colors.lightGray};
    padding-left: 13px;
    margin: 15px 0;
    position: relative;
    display: flex;
    align-items: center;
    
    &:before {
      content: '*';
      position: absolute;
      color: ${Colors.red};
      padding-right: 3px;
      font-size: 14px;
      line-height: 1;
      position: absolute;
      top: 2px;
      left: 0;
    }
`;

export const Input = styled(InputUI)`
    height: 42px;
    padding: 6px 10px;
`;

export const OtherLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    margin-top: 35px;
    border-top: 1px dashed #D8D8D8;
`;

export const ForgotPassword = styled(Link)`
    font-size: 12px;
    color: ${Colors.dark};
    text-decoration: none;
    
    &:hover {
        color: ${Colors.lightBlue}
    }
`;

export const SignUp = styled(Link)`
    margin-top: 20px;
    text-decoration: none;
    color: ${Colors.lightBlue};
    
    &:hover {
        color: ${Colors.dark};
    }
`;