import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { SignInStyleWrapper, LoginContentWrapper, LoginContent, LogoWrapper, SignInForm, LogoLink, InputWrapper, LeftRightComponent, Input, HelperText, OtherLogin, ForgotPassword, SignUp } from './styles';
import { Primary as PrimaryButton } from "components/Button";
import Alert from 'components/Alert';
import { Login } from '../types';
import { Loader, LoaderWrapper } from "components/Loader";

@connect((state) => ({
    auth: state.auth
}), actions)
export default class SignIn extends Component<null, Login>
{
    state = {
        login: '',
        password: ''
    };

    componentDidMount()
    {
        this.props.checkAuth();
    }

    loginHandler = () => {
        this.props.login(this.state);
    };

    keyPressHandler = (e) => {
        if (e.key === 'Enter') this.props.login(this.state);
    };

    render()
    {
        const { code, message } = this.props.auth.error;
        const { loading, authorized } = this.props.auth;

        if (authorized && authorized !== null) return <Redirect to="/" />;

        return (
            <SignInStyleWrapper>
                <LoginContentWrapper>
                    <LoginContent>
                        <LogoWrapper>
                            <LogoLink to="/">Hashman</LogoLink>
                        </LogoWrapper>
                        <SignInForm>
                            <LoaderWrapper visible={loading}>
                                <Loader />
                            </LoaderWrapper>
                            <InputWrapper>
                                <Alert closed={code >= 0 || code == -2} message={message} />
                            </InputWrapper>
                            <InputWrapper>
                                <Input size="large" placeholder="Логин"
                                       onChange={(e) => this.setState({ login: e.target.value })}
                                       onKeyPress={this.keyPressHandler}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <Input size="large" type="password" placeholder="Пароль"
                                       onChange={(e) => this.setState({ password: e.target.value })}
                                       onKeyPress={this.keyPressHandler}
                                />
                            </InputWrapper>
                            <LeftRightComponent>
                                <HelperText>Все поля обязательны</HelperText>
                                <PrimaryButton onClick={this.loginHandler}>Войти</PrimaryButton>
                            </LeftRightComponent>
                            <OtherLogin>
                                <ForgotPassword to="/auth/forgot">Забыли пароль?</ForgotPassword>
                                <SignUp to="/auth/signup">Создать аккаунт</SignUp>
                            </OtherLogin>
                        </SignInForm>
                    </LoginContent>
                </LoginContentWrapper>
            </SignInStyleWrapper>
        );
    }
}