import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateAdminRoute, PrivateRoute } from '../_components';
import { HomePage } from '../Views/HomePage';
import { AdminPage } from '../Views/AdminPage';
import {
	ForgotPasswordPage,
	LoginPage,
	ResetPasswordPage,
	SignupPage,
	VerificationPage
} from '../Views/LoginPage';
import { LogPage } from '../Views/LogPage';
import { NavBar } from '../Views/NavBar';
import { Footer } from '../Views/Footer';

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
				<div className="page-content">
					<NavBar />
					<Router history={history}>
						<div id="page-wrap" className="container-lg">
							{alert.message &&
								<div className={`alert ${alert.type}`}>{alert.message}</div>
							}
							<Switch>
								<PrivateRoute exact path="/" component={LogPage} />
								<PrivateRoute path="/activity-log" component={LogPage} />
								<PrivateAdminRoute path="/admin" component={AdminPage} />
								<Route path="/forgot-password" component={ForgotPasswordPage} />
								<Route path="/login" component={LoginPage} />
								<Route path="/reset-password" component={ResetPasswordPage} />
								<Route path="/signup" component={SignupPage} />
								<Route path="/verify" component={VerificationPage} />
							</Switch>
						</div>
					</Router>
					<Footer />

				</div>
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