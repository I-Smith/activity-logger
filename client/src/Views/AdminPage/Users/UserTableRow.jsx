import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';
import { userStatuses } from '../../../_constants';
import { 
	getIsUserEditing,
} from '../../../_selectors/users.selectors';
const {
	ACTIVE, DENIED, LOCKED, UNREVIEWED
} = userStatuses;

class UserTableRow extends React.Component {
	constructor(props) {
		super(props);

		this.handleApproveUser = this.handleApproveUser.bind(this);
		this.handleApproveAdminUser = this.handleApproveAdminUser.bind(this);
		this.handleDenyUser = this.handleDenyUser.bind(this);
		this.handleLockUser = this.handleLockUser.bind(this);
	}

	handleApproveUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { status: userStatuses.ACTIVE }));
	}

	handleApproveAdminUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { status: userStatuses.ACTIVE, role: 'Admin' }));
	}

	handleDenyUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { status: userStatuses.DENIED }));
	}

	handleLockUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { status: userStatuses.LOCKED }));
	}

	render() {
		const {
			currentUser,
			user,
			isUserEditing,
		} = this.props;
		return (
			<React.Fragment>
				<tr id={`user_${user.id}`}>
					<td>
						{user.firstName} {user.lastName}{(user.id === currentUser.id) ? ' (you)' : ''}
					</td>
					<td>{user.email}</td>
					<td>
						{isUserEditing ? (
							<div className="spinner-border spinner-border-sm text-dark ml-2" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						) : (
							<>
								{user.status === DENIED && (
									<button
										className="btn btn-success mr-2"
										type="button"
										onClick={this.handleApproveUser}
									>
										Approve
									</button>
								)}
								{user.status === UNREVIEWED && (
									<>
										<button
											className="btn btn-success mr-2"
											type="button"
											onClick={this.handleApproveUser}
										>
											Approve
										</button>
										<button
											className="btn btn-info mr-2"
											type="button"
											onClick={this.handleApproveAdminUser}
										>
											Approve for Admin
										</button>
										<button
											className="btn btn-danger mr-2"
											type="button"
											onClick={this.handleDenyUser}
										>
											Deny
										</button>
									</>
								)}
								{user.status === ACTIVE && (
									<button
										className="btn btn-info mr-2"
										type="button"
										onClick={this.handleLockUser}
									>
										Lock
									</button>
								)}
								{user.status === LOCKED && (
									<button
										className="btn btn-info mr-2"
										type="button"
										onClick={this.handleApproveUser}
									>
										Unlock
									</button>
								)}
							</>
						)}
					</td>
				</tr>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, { user }) {
	return {
		currentUser: state.authentication.user,
		isUserEditing: getIsUserEditing(state, user.id),
	};
}

const connectedUserTableRow = connect(mapStateToProps)(UserTableRow);
export { connectedUserTableRow as UserTableRow };