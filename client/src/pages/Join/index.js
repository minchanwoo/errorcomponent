import React, { Component } from 'react';
import {Header, Button, Input } from 'semantic-ui-react'

import { bodyValidator } from '../../utils/validator';

import Axios from 'axios';

class Join extends Component {
	state = {
		email: '',
		name: '',
		nick: '',
		password: '',
		password_confirm: '',
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
			name: this.state.name,
			email: this.state.email,
			nick: this.state.nick,
			password: this.state.password,
			password_confirm: this.state.password_confirm
		}
		try {
			bodyValidator(body);
			await Axios.post('http://localhost:4000/users/join', body);
				alert('회원가입에 성공하였습니다');
				this.props.history.push('/login');
		} catch(catchedError) {
			const errorMessage = (catchedError.response && catchedError.response.data)
					? catchedError.response.data.errorMessage
					: catchedError.message;
			this.setState({
				errorMessage
			});
		}
	}


	render() {
		return (
			<div>
				<Header>JOIN Page</Header>
				<form onSubmit={this.handleSubmit}>
					<Input type='email' name='email' placeholder='이메일' onInput={this.handleInput} /><br/>
					<Input type='text' name='nick' placeholder='닉네임' onInput={this.handleInput} /><br/>
					<Input type='text' name='name' placeholder='이름' onInput={this.handleInput} /><br/>
					<Input type='password' name='password' placeholder='비밀번호' onInput={this.handleInput} /><br/>
					<Input type='password' name='password_confirm' placeholder='비밀번호 확인' onInput={this.handleInput} /><br/><br/>
					<div style={{color: 'red'}}>{this.state.errorMessage}</div>
					<Button type='submit' primary>가입</Button>
				</form>
			</div>
		);
	}
}

export default Join;