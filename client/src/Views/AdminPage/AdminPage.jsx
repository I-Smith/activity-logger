import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { Challenges } from './Challenges';
import { UserManagement } from './Users'
import { challengesActions } from '../../_actions';

class AdminPage extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		this.props.dispatch(challengesActions.getAll());
	}

	componentDidUpdate(prevProps) {
		const { challenges } = this.props;
		if (challenges.needsReload && !prevProps.challenges.needsReload) {
			this.props.dispatch(challengesActions.getAll());
		}
	}

	render() {
		const {
		} = this.props;
		return (
			<React.Fragment>
				<div className="mx-auto text-center">
					<h2>Admin</h2>
					<Challenges />
					<UserManagement />
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { challenges, error, loading } = state.challenges;
	const { user } = state.authentication;
	return {
		challenges,
		error,
		loading,
		user,
	};
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };