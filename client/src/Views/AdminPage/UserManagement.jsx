import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import {
	getIsUnapprovedUsersError,
	getIsUnapprovedUsersLoading,
	getUnapprovedUsers,
} from '../../_selectors/users.selectors';
import { UnapprovedUserTableRow } from './UnapprovedUserTableRow';

const UNAPPROVED = 'Unapproved';
const ALL = 'All';

class UserManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: UNAPPROVED,
		};

		this.handleChangeTab = this.handleChangeTab.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(userActions.getUnapproved());
	}

	handleChangeTab(tabName) {
		this.setState({ activeTab: tabName });
	}

	render() {
		const { activeTab } = this.state;
		const {
			unapprovedUsers,
			isUnapprovedUsersError,
			isUnapprovedUsersLoading,
		} = this.props;
		return (
			<React.Fragment>
				<div className="UserManagement-margin-top mx-auto text-center">
					<h3>User Management</h3>
					<div className="mt-2">
						{isUnapprovedUsersLoading && (
							<div className="spinner-border text-secondary" role="status">
								<span className="sr-only">Loading users...</span>
							</div>
						)}
						{isUnapprovedUsersError && <span className="text-danger">Action could not be complete at this time.</span>}
					</div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === UNAPPROVED ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(UNAPPROVED)}
							>
								Unapproved
							</a>
						</li>
						{/* <li className="nav-item">
							<a
								className={`nav-link ${activeTab === ALL ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(ALL)}
							>
								FUTURE WORK
							</a>
						</li> */}
					</ul>
					{activeTab === UNAPPROVED && (
						<>
						{_.size(unapprovedUsers) > 0 ? (
							<table className="table table-responsive-sm table-striped table-hover mt-2">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Email</th>
										<th scope="col">Action(s)</th>
									</tr>
								</thead>
								<tbody>
									{_.map(unapprovedUsers, (user) => (
										<UnapprovedUserTableRow
											key={user.id}
											user={user} 
										/>
									))}
								</tbody>
							</table>
						) : (
							<div className="mt-3">
								{
									!isUnapprovedUsersLoading && (<h3 className="text-secondary">NO UN-APPROVED USERS</h3>)
								}
							</div>
						)}
						</>
					)}
					
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state.authentication;
	return {
		unapprovedUsers: getUnapprovedUsers(state),
		isUnapprovedUsersError: getIsUnapprovedUsersError(state),
		isUnapprovedUsersLoading: getIsUnapprovedUsersLoading(state),
		user,
	};
}

const connectedUserManagement = connect(mapStateToProps)(UserManagement);
export { connectedUserManagement as UserManagement };