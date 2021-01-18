import React from 'react';
import { connect } from 'react-redux';
import { SideBar } from './SideBar';
import { MenuItems } from './MenuItems';

class NavBar extends React.Component {
	render() {
		const {user} = this.props;
		return (
			<nav className="navbar navbar-expand-md fixed-top Navbar-color">
				<div className="container">
					<a className="navbar-brand" href="https://www.rucksonparade.com/">
						<img className="Navbar-logo" src="../../../public/RUCKS ON PARADE logo.png" alt="Rucks On Parade"/>
					</a>

					<div className="Navbar-Menu-Wrapper">
						<MenuItems />
					</div>
					<div className="Sidebar-wrapper">
						<SideBar pageWrapId={'page-wrap'} outerContainerId={'app'} />
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