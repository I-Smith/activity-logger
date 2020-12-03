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
		} = this.state;
		const { dispatch } = this.props;
		if (email && password) {
			dispatch(userActions.login(email, password));
		}
	}

	render() {
		const { failed, loggingIn } = this.props;
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			submitted,
		} = this.state;
		return (
			<div className="col-md-6 col-md-offset-3 mx-auto">
				<h2>Sign Up</h2>
				<form name="form" onSubmit={this.handleSubmit}>
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
					</div>
					<div className={'form-group' + (submitted && (!confirmPassword || confirmPassword !== password) ? ' has-error' : '')}>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input type="confirmPassword" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
						{submitted && (!confirmPassword || confirmPassword !== password) &&
							<div className="help-block text-danger">Passwords must match</div>
						}
					</div>
					{failed &&
						<p className="text-danger">Incorrect Email or Password entered</p>
					}
					<div className="form-group">
						<button className="btn btn-primary">Sign Up</button>
						{loggingIn &&
							<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
						}
					</div>
				</form>
				<p>Already have an account? <Link to="/login">Log In</Link></p>
			</div>
		);
	}
}
	
function mapStateToProps(state) {
	const { failed, loggingIn } = state.authentication;
	return {
		failed,
		loggingIn,
	};
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage }; 