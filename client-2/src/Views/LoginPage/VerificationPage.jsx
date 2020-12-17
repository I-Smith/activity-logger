import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

const ALREADY_VERIFIED = "This email has already been verified";

class VerificationPage extends React.Component {
	componentDidMount() {
		const urlParams = new URLSearchParams(location.search);
		const token = urlParams.get('token');
		this.props.dispatch(userActions.verify(token))
	}

	render() {
		const {
			loading,
			error,
			failed,
		} = this.props;
		const errorType = error === ALREADY_VERIFIED ? 'warning' : 'danger';
		return (
			<React.Fragment>
				<div className="col-md-6 col-md-offset-3 mx-auto">
					<h2>Verification</h2>

					{failed && (
						<div className={`alert alert-${errorType} text-center`} role="alert">
							{error}. <Link to="/login">Log In</Link>
						</div>
					)}
					{loading && (
						<div className="text-center">
							<div className="spinner-border spinner-border-lg text-dark" style={{width: '5rem', height: '5rem'}} role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}
	
function mapStateToProps(state) {
	const { loading, message, error, succeeded, failed } = state.verification;
	return {
		error,
		failed,
		loading,
		message,
		succeeded,
	};
}

const connectedVerificationPage = connect(mapStateToProps)(VerificationPage);
export { connectedVerificationPage as VerificationPage }; 