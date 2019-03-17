import React, { Component } from 'react';
import {Header, Button, Input } from 'semantic-ui-react'

import Axios from 'axios';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: '',
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = async(e) => {
		e.preventDefault();

		const body = {
			email: this.state.email,
			password: this.state.password,
		}

		try {
			await Axios.post('http://localhost:4000/users/login', body, {withCredentials: true});
				this.props.history.push('/');
		} catch(catchedError) {
			const errorMessage = (catchedError.response && catchedError.response.data)
					? catchedError.response.data.errorMessage
					: catchedError.message
				this.setState({
					errorMessage,
				})
		}

	}


	render() {
		return (
			<div style={{padding:'20px'}}>
				<Header>Login Page</Header>
				<form onSubmit={this.handleSubmit}>
					<Input type='email' name='email' placeholder='이메일' onInput={this.handleInput} /><br/>
					<Input type='password' name='password' placeholder='비밀번호' onInput={this.handleInput} /><br/><br/>
					<div style={{color: 'red'}}>{this.state.errorMessage}</div>
					<Button type='submit' color='yellow'>로그인</Button>
				</form>
			</div>
		);
	}
}

export default Login;