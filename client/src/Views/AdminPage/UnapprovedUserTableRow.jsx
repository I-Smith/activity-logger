import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { 
	getIsUserEditing,
} from '../../_selectors/users.selectors';

class UnapprovedUserTableRow extends React.Component {
	constructor(props) {
		super(props);

		this.handleApproveUser = this.handleApproveUser.bind(this);
		this.handleApproveAdminUser = this.handleApproveAdminUser.bind(this);
	}

	handleApproveUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { approved: true }));
	}

	handleApproveAdminUser() {
		const { user } = this.props;
		this.props.dispatch(userActions.edit(user.id, { approved: true, role: 'Admin' }));
	}

	render() {
		const {
			user,
			isUserEditing,
		} = this.props;
		return (
			<React.Fragment>
				<tr id={`user_${user.id}`}>
					<td>{user.firstName} {user.lastName}</td>
					<td>{user.email}</td>
					<td>
						{isUserEditing ? (
							<div className="spinner-border spinner-border-sm text-dark ml-2" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						) : (
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
		isUserEditing: getIsUserEditing(state, user.id),
	};
}

const connectedUnapprovedUserTableRow = connect(mapStateToProps)(UnapprovedUserTableRow);
export { connectedUnapprovedUserTableRow as UnapprovedUserTableRow };