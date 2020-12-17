import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

const TOKEN_INVALID = "Invalid token";

class ResetPasswordPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			confirmPassword: '',
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
		const { password, confirmPassword } = this.state;
		const { dispatch } = this.props;

		const urlParams = new URLSearchParams(location.search);
		const token = urlParams.get('token');

		if ((password && password.length >= 6) && (confirmPassword && confirmPassword === password)) {
			dispatch(userActions.resetPassword({
				token,
				password,
				confirmPassword,
			}));
		}
	}

	render() {
		const { failed, loading, error } = this.props;
		const { password, confirmPassword, submitted } = this.state;
		const isTokenInvalid = error === TOKEN_INVALID;
		
		return (
			<div className="col-md-6 col-md-offset-3 mx-auto">
				<h2>Reset Password</h2>
				{failed ? (
					<div className="alert alert-danger" role="alert">
						{isTokenInvalid ? 'Your token is invalid. ' : 'An error has occurred. '}
						Please resubmit the <Link to="/forgot-password">Forgot Password</Link> form to try again.
					</div>
				) : (
					<React.Fragment>
						<form name="resetPassword" onSubmit={this.handleSubmit}>
							<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
								<label htmlFor="password">Password</label>
								<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
								{submitted && !password &&
									<div className="help-block text-danger">Password is required</div>
								}
								{submitted && password && password.length < 6 &&
									<div className="help-block text-danger">Password must be at least 6 characters</div>
								}
							</div>
							<div className={'form-group' + (submitted && (!confirmPassword || confirmPassword !== password) ? ' has-error' : '')}>
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
								{submitted && (!confirmPassword || confirmPassword !== password) &&
									<div className="help-block text-danger">Passwords must match</div>
								}
							</div>
							<div className="form-group mt-4">
								<button className="btn btn-primary">
									Submit
									{loading && (
										<div className="spinner-border spinner-border-sm text-light ml-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									)}
								</button>
								
							</div>
						</form>
					</React.Fragment>
				)}
			</div>
		);
	}
}
	
function mapStateToProps(state) {
	const { failed, loading, error, succeeded } = state.resetPassword;
	return {
		failed,
		loading,
		error,
		succeeded,
	};
}

const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage }; 