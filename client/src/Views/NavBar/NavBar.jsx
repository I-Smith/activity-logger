import React from 'react';
import { connect } from 'react-redux';

class NavBar extends React.Component {
	componentDidMount() {
	}

	render() {
		const {user} = this.props;
		return (
			<nav className="navbar navbar-expand-md fixed-top Navbar-color">
				<div className="container">
					<a className="navbar-brand" href="https://www.rucksonparade.com/">
						<img className="Navbar-logo" src="https://static1.squarespace.com/static/5d364f576448090001058d3a/t/5f873d529784e33ac697a017/1606319014984/?format=1500w" alt="Rucks On Parade"/>
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerNavbar" aria-controls="headerNavbar" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="headerNavbar">
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
					</div>
				</div>
			</nav>
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

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };