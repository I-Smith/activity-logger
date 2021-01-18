import React from 'react';
import { connect } from 'react-redux';

class MenuItems extends React.Component {
	render() {
		const {user} = this.props;
		return (
			<ul className="navbar-nav ml-md-auto">
				{user && user.role === 'Admin' && (
					<li className="nav-item">
						<a className="nav-link text-monospace text-uppercase Navbar-link" href="/admin">ADMIN</a>
					</li>
				)}
				<li className="nav-item">
					<a className="nav-link text-monospace text-uppercase Navbar-link" href="/activity-log">ACTIVITY</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-monospace text-uppercase Navbar-link" href="/login">{user ? 'Logout' : 'Login'}</a>
				</li>
			</ul>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users
	};
}

const connectedMenuItems = connect(mapStateToProps)(MenuItems);
export { connectedMenuItems as MenuItems };