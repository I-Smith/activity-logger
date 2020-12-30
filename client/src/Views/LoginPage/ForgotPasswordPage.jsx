import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class ForgotPasswordPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
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
		const { email } = this.state;
		const { dispatch } = this.props;
		if (email) {
			dispatch(userActions.forgotPassword(email));
		}
	}

	render() {
		const { failed, loading, message, succeeded } = this.props;
		const { email, submitted } = this.state;
		return (
			<div className="col-md-6 col-md-offset-3 mx-auto">
				<h2>Forgot Password</h2>
				{succeeded ? (
					<div className="alert alert-success" role="alert">
						{message}
					</div>
				) : (
					<React.Fragment>
						<form name="forgotPassword" onSubmit={this.handleSubmit}>
							<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
								<label htmlFor="email">Email</label>
								<input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
								{submitted && !email &&
									<div className="help-block text-danger">Email is required</div>
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
	const { failed, loading, message, succeeded } = state.forgotPassword;
	return {
		failed,
		loading,
		message,
		succeeded,
	};
}

const connectedForgotPasswordPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage }; 