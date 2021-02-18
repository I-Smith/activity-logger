import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import { userActions } from '../../../_actions';
import {
	getIsUsersError,
	getIsUsersLoading,
	getUsers,
} from '../../../_selectors/users.selectors';
import { userStatuses } from '../../../_constants/user.constants';
import { UsersTable } from './UsersTable';

const { ACTIVE, DENIED, LOCKED, UNREVIEWED } = userStatuses;

class UserManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: UNREVIEWED,
		};

		this.handleChangeTab = this.handleChangeTab.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(userActions.getAll());
	}

	handleChangeTab(tabName) {
		this.setState({ activeTab: tabName });
	}

	render() {
		const { activeTab } = this.state;
		const {
			isUsersError,
			isUsersLoading,
			users,
		} = this.props;

		const reportHeaders = [
			{ label: "Name", key: "name" },
			{ label: "Email", key: "email" },
			{ label: 'Account Status', key: 'status' },
		];
		const reportData = _.sortBy(
			_.map(users, (user) => ({
				name: `${user.firstName} ${user.lastName}`,
				email: user.email,
				status: user.status,
			})), 'status');
		return (
			<React.Fragment>
				<div className="UserManagement-margin-top mx-auto text-center">
					<h3>User Management</h3>
					<div className="mt-2">
						{isUsersLoading && (
							<div className="spinner-border text-secondary" role="status">
								<span className="sr-only">Loading users...</span>
							</div>
						)}
						{isUsersError && (
							<span className="text-danger">Action could not be complete at this time.</span>
						)}
					</div>
					{!isUsersError && !isUsersLoading && (
						<CSVLink
							data={reportData}
							headers={reportHeaders}
							filename={`${status} Users (as of ${dayjs().format('MM-DD-YYYY')}).csv`}
							className="btn btn-info mt-2"
						>
							Generate User Report
						</CSVLink>

					)}
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === UNREVIEWED ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(UNREVIEWED)}
							>
								Unreviewed
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === ACTIVE ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(ACTIVE)}
							>
								Active
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === LOCKED ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(LOCKED)}
							>
								Locked
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === DENIED ? 'active' : ''}`}
								onClick={() => this.handleChangeTab(DENIED)}
							>
								Denied
							</a>
						</li>
					</ul>
					{activeTab === UNREVIEWED && (<UsersTable status={UNREVIEWED} />)}
					{activeTab === ACTIVE && (<UsersTable status={ACTIVE} />)}
					{activeTab === LOCKED && (<UsersTable status={LOCKED} />)}
					{activeTab === DENIED && (<UsersTable status={DENIED} />)}
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		isUsersError: getIsUsersError(state),
		isUsersLoading: getIsUsersLoading(state),
		users: getUsers(state),
	};
}

const connectedUserManagement = connect(mapStateToProps)(UserManagement);
export { connectedUserManagement as UserManagement };