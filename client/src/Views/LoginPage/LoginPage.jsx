import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.dispatch(userActions.logout());

		this.state = {
			email: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { email, password } = this.state;
		const { dispatch } = this.props;
		if (email && password) {
			dispatch(userActions.login(email.toLowerCase(), password));
		}
	}

	render() {
		const { failed, loggingIn, verificationMessage } = this.props;
		const { email, password, submitted } = this.state;
		return (
			<React.Fragment>
				<div className="col-md-6 col-md-offset-3 mx-auto">
					{verificationMessage && (
						<div className="alert alert-success" role="alert">
							{verificationMessage}
						</div>
					)}
					<h2>Login</h2>
					<form name="form" onSubmit={this.handleSubmit}>
						<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
							<label htmlFor="email">Email</label>
							<input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
							{submitted && !email &&
								<div className="help-block text-danger">Email is required</div>
							}
						</div>
						<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
							<label htmlFor="password">Password</label>
							<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange}/>
							{submitted && !password &&
								<div className="help-block text-danger">Password is required</div>
							}
						</div>
						{failed &&
							<p className="text-danger">Incorrect Email or Password entered</p>
						}
						<div className="form-group">
							<button className="btn btn-primary">
								Login
								{loggingIn && (
										<div className="spinner-border spinner-border-sm text-light ml-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									)}
							</button>
						</div>
					</form>
					<p>Need an account? <Link to="/signup">Sign up</Link></p>
					<p>Having trouble? <Link to="/forgot-password">Forgot Password</Link></p>
				</div>
			</React.Fragment>
		);
	}
}
	
function mapStateToProps(state) {
	const { failed, loggingIn } = state.authentication;
	const { verificationMessage } = state.verification;
	return {
		failed,
		loggingIn,
		verificationMessage,
	};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 