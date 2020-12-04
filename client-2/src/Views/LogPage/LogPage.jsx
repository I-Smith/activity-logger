import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { EventForm } from '../EventForm';
import { LogTableRow } from './LogTableRow';

import { userEventsActions } from '../../_actions';

class LogPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		this.props.dispatch(userEventsActions.getAll(user.id));
	}

	componentDidUpdate(prevProps) {
		const { user, userEvents } = this.props;
		if (userEvents.needsReload && !prevProps.userEvents.needsReload) {
			this.props.dispatch(userEventsActions.getAll(user.id));
		}
	}

	
	handleDeleteEvent(eventId) {
		const { user} = this.props;
		this.props.dispatch(userEventsActions.delete(user.id, eventId));
	}

	render() {
		const { user, userEvents, location } = this.props;
		return (
			<React.Fragment>
				<div className="mx-auto text-center">
					<h3 className="">
						Hello {user.firstName}, welcome to your activity chart!
					</h3>
					<div className="mt-4">

						<EventForm
							buttonClassNames="btn-success"
						>
							Add New Event
						</EventForm>
						<div className="mt-2">
							{userEvents.loading && (
								<div className="spinner-border text-secondary" role="status">
									<span className="sr-only">Loading log events...</span>
								</div>
							)}
							{userEvents.error && <span className="text-danger">Action could not be complete at this time.</span>}
							{/* {userEvents.error && <span className="text-danger">ERROR: {JSON.stringify(userEvents.error)}</span>} */}
						</div>

						{_.size(userEvents.logEvents) > 0 ? (
							<table className="table table-striped table-hover mt-2">
								<thead>
									<tr>
										<th scope="col">Date</th>
										<th scope="col">Challenge</th>
										<th scope="col">Distance <p className="Unit-text">(mi)</p></th>
										<th scope="col">Duration</th>
										<th scope="col">Ruck<p className="Unit-text">(lbs)</p></th>
										<th scope="col">Coupon<p className="Unit-text">(lbs)</p></th>
										<th scope="col">Edit/Delete</th>
									</tr>
								</thead>
								<tbody>
									{userEvents.logEvents.map((event, index) => (
										<LogTableRow
											event={event}
											key={index}
										/>
									))}
								</tbody>
							</table>
						) : (
							!userEvents.loading && <h3 className="text-secondary">NO LOG EVENTS FOUND</h3>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { userEvents, authentication } = state;
	const { user } = authentication;
	return {
		user,
		userEvents,
	};
}

const connectedLogPage = connect(mapStateToProps)(LogPage);
export { connectedLogPage as LogPage };