import React from 'react';
import { connect } from 'react-redux';

class FooterNav extends React.Component {
	render() {
		const {user} = this.props;
		return (
			<nav className="navbar Navbar-color">
				<div className="text-center">
					<p>Somethin' funky? <a href="mailto:info@rucksonparade.com">Drop us a line</a>.</p>
				</div>
			</nav>
		);
	}
}

// function mapStateToProps(state) {
// 	const { users, authentication } = state;
// 	const { user } = authentication;
// 	return {
// 		user,
// 		users
// 	};
// }

// const connectedNavBar = connect(mapStateToProps)(NavBar);
// export { connectedNavBar as NavBar };
export { FooterNav };