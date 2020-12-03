import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Views/HomePage';
import { LoginPage, SignupPage } from '../Views/LoginPage';
import { LogPage } from '../Views/LogPage';
import { NavBar } from '../Views/NavBar';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<React.Fragment>
				<NavBar />
				{alert.message &&
					<div className={`alert ${alert.type}`}>{alert.message}</div>
				}
				<Router history={history}>
					<div className="page-content container">
						<PrivateRoute exact path="/" component={LogPage} />
						<PrivateRoute path="/activity-log" component={LogPage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/signup" component={SignupPage} />
					</div>
				</Router>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 