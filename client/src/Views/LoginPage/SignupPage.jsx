import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class SignupPage extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.dispatch(userActions.logout());

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			acceptTerms: false,
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
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			acceptTerms,
		} = this.state;
		const { dispatch } = this.props;

		if (
			firstName
			&& lastName
			&& email
			&& (password && password.length >= 6)
			&& (confirmPassword && confirmPassword === password)
			&& acceptTerms
		) {
			dispatch(userActions.register({
				firstName,
				lastName,
				email: email.toLowerCase(),
				password,
				confirmPassword,
				acceptTerms: true,
			}));
		}
	}

	render() {
		const {
			failed,
			loading,
			succeeded,
			message,
		} = this.props;
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			acceptTerms,
			submitted,
		} = this.state;
		return (
			<div className="col-md-6 col-md-offset-3 mx-auto">
				<h2>Sign Up</h2>
				{succeeded ? (
					<div className="alert alert-success" role="alert">
						{message}
					</div>
				) : (
					<React.Fragment>
						<form name="signup" onSubmit={this.handleSubmit}>
							<div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
								<label htmlFor="firstName">First Name</label>
								<input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
								{submitted && !firstName &&
									<div className="help-block text-danger">First Name is required</div>
								}
							</div>
							<div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
								<label htmlFor="lastName">Last Name</label>
								<input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
								{submitted && !lastName &&
									<div className="help-block text-danger">Last Name is required</div>
								}
							</div>
							<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
								<label htmlFor="email">Email</label>
								<input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
								{submitted && !email &&
									<div className="help-block text-danger">Email is required</div>
								}
							</div>
							<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
								<label htmlFor="password">Password</label>
								<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
								{submitted && !password &&
									<div className="help-block text-danger">Password is required</div>
								}
								{submitted && password.length < 6 &&
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
							<div className={'form-group form-check' + (submitted && !acceptTerms ? ' has-error' : '')}>
								<input type="checkbox" className="form-check-input" name="acceptTerms" value={acceptTerms} onChange={this.handleChange}/>
								<label htmlFor="acceptTerms">I agree to the <a href="https://www.rucksonparade.com/web-site-terms" target="_blank">Terms and Conditions</a></label>
								{submitted && !acceptTerms &&
									<div className="help-block text-danger">You must agree to continue</div>
								}
							</div>
							<div className="form-group mt-4">
								<button className="btn btn-primary">
									Sign Up
									{loading && (
										<div className="spinner-border spinner-border-sm text-light ml-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									)}
								</button>
								
							</div>
						</form>
						<p>Already have an account? <Link to="/login">Log In</Link></p>
					</React.Fragment>
				)}
			</div>
		);
	}
}
	
function mapStateToProps(state) {
	const { loading, message, succeeded, failed } = state.registration;
	return {
		failed,
		loading,
		message,
		succeeded,
	};
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage }; 