import React, {Component} from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from "~/components/Button";
import { Form, Inline, Required } from '../styles';
import { Input } from '~/components/Form';
import Loader from '~/components/Loader';
import Alert from '~/components/Alert';

type Props = {};

@hot(module)
@connect((state) => ({
    auth: state.auth
}), actions)
export default class extends Component<Props>
{
    state = {
        login: '',
        password: ''
    };

    signinHandler = () => {
        this.props.signin({ login: this.state.login, password: this.state.password });
    };

    render()
    {
        const { loading } = this.props.auth.pending;
        const { error } = this.props.auth;

        return (
            <Loader loading={loading} style={{ height: 'auto' }} transparent={0.4}>
                <Form>
                    { error.code === -1 ? <Alert type="error">{ error.message }</Alert> : null }
                    <Input type="text" placeholder="Логин" onChange={(e) => this.setState({ login: e.target.value })} value={this.state.login} />
                    <Input type="password" placeholder="Пароль" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
                    <Inline>
                        <Required>Все поля обязательны</Required>
                        <Button type="primary" onClick={this.signinHandler}>Войти</Button>
                    </Inline>
                </Form>
            </Loader>
        );
    }
}