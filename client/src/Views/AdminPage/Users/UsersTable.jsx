import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import {
	getIsUsersLoading,
	getUsersByStatus,
} from '../../../_selectors/users.selectors';
import { UserTableRow } from './UserTableRow';

class UsersTable extends React.Component {
	render() {
		const {
			isUsersLoading,
			status,
			users,
		} = this.props;
		return (
			<React.Fragment>
				{_.size(users) > 0 ? (
					<table className="table table-responsive-sm table-striped table-hover mt-2">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Action(s)</th>
							</tr>
						</thead>
						<tbody>
							{_.map(users, (user) => (
								<UserTableRow
									key={user.id}
									user={user} 
								/>
							))}
						</tbody>
					</table>
				) : (
					<div className="mt-3">
						{
							!isUsersLoading && (<h3 className="text-secondary">NO {status} USERS</h3>)
						}
					</div>
				)}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, {status}) {
	// console.log(status)
	return {
		users: getUsersByStatus(state, status),
		isUsersLoading: getIsUsersLoading(state),
	};
}

const connectedUsersTable = connect(mapStateToProps)(UsersTable);
export { connectedUsersTable as UsersTable };