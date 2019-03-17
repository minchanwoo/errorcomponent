import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Axios from 'axios';
import { truncate } from 'fs';

class CustomMenu extends Component {
	render() {
		return (
			<Link to={this.props.to}>
				<Menu.Item
					name={this.props.name}
					active={this.props.activeItem === this.props.name}
					onClick={this.props.handleItemClick}
				/>
			</Link>
		);
	}
}


class NavBar extends Component {
	state = { 
		loggedInUser: {
			name: '',
			email: '',
			nick: '',
		},
		activeItem: 'home' 
	}

	fetchUser = () => {
		Axios.get('http://localhost:4000/users/info', {withCredentials:true})
			.then((res) => 
				this.setState({
					loggedInUser: {
						name: res.data.user ? res.data.user.name : '',
						nick: res.data.user ? res.data.user.nick : '',
						email: res.data.user ? res.data.user.email : '',
					}
				})
			);
	}

	constructor(props) {
		super(props);
		this.fetchUser();
	}

	shouldComponentUpdate() {
			this.fetchUser();
			return true;
	}

	handleItemClick = (e, { name }) => 
		this.setState({ 
			activeItem: name 
		});

	render() {
		const menues = (this.state.loggedInUser.email)
				? [{name: 'Home', to: '/'}, {name: 'MyPage', to: '/mypage'}]
				: [{name: 'Home', to: '/'}, {name: 'Join', to: '/join'}, {name: 'Login', to: '/login'}]
		return (
			<Segment inverted>
        <Menu inverted pointing secondary>
					{menues.map((menu, i)=>
						<CustomMenu 
							key={i}
							name={menu.name} 
							to={menu.to} 
							handleItemClick={this.handleItemClick} 
							activeItem={this.state.activeItem} 
						/>)}
						<Menu.Item>
							{this.state.loggedInUser.name
								? `${this.state.loggedInUser.nick}님 안녕하세요!`
								: '회원가입해주세요!'
							} 
						</Menu.Item>
        </Menu>
      </Segment>
		);
	}
}

export default NavBar;