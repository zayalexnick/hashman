import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from "~/components/Button";
import { Form, Inline, Required, Wrapper, Content, Logo, Link } from '../styles';
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
        password: '',
		email: ''
    };

	componentDidMount()
	{
		this.props.checkAuth();
	}

    signupHandler = () => {
        this.props.signup({ login: this.state.login, password: this.state.password, email: this.state.email });
    };

	getError = (field) => {
		let result = null;

		const { message } = this.props.auth.error;

		if (Array.isArray(message)) {
			message.map((item) => {
				if (item.name === field) result = item.errorText;
			})
		}

		return result;
	};

    render()
    {
    	const { authorized } = this.props.auth.entities;

		if (authorized)
			return <Redirect to="/" />;

        const { loading } = this.props.auth.pending;
        const { error } = this.props.auth;

        return (
			<Wrapper>
				<Content>
					<Logo>Hashman</Logo>
					<Loader loading={loading} style={{ height: 'auto' }} transparent={0.4}>
						<Form>
							<Input type="text" error={this.getError('login')} placeholder="Логин" onChange={(e) => this.setState({ login: e.target.value })} value={this.state.login} />
							<Input type="password" error={this.getError('password')} placeholder="Пароль" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
							<Input type="email" error={this.getError('email')} placeholder="E-mail" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
							<Inline>
								<Required>Все поля обязательны</Required>
								<Button type="primary" onClick={this.signupHandler}>Зарегистрироваться</Button>
							</Inline>
							<Link to="/auth">Войти</Link>
						</Form>
					</Loader>
				</Content>
			</Wrapper>
        );
    }
}