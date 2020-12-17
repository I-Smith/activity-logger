import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Views/HomePage';
import {
	ForgotPasswordPage,
	LoginPage,
	ResetPasswordPage,
	SignupPage,
	VerificationPage
} from '../Views/LoginPage';
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
				<Router history={history}>
					<div className="page-content container">
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<PrivateRoute exact path="/" component={LogPage} />
						<PrivateRoute path="/activity-log" component={LogPage} />
						<Route path="/forgot-password" component={ForgotPasswordPage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/reset-password" component={ResetPasswordPage} />
						<Route path="/signup" component={SignupPage} />
						<Route path="/verify" component={VerificationPage} />
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