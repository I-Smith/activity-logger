import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userEventsActions } from '../_actions';

class LogPage extends React.Component {
	componentDidMount() {
		const { user } = this.props;
		this.props.dispatch(userEventsActions.getAll(user.id));
	}

	render() {
		const { userEvents, location } = this.props;
		return (
			<div className="mx-auto text-center">
				<h3 className="">
					Hello, welcome to your activity chart!
				</h3>
				{userEvents.loading && <em>Loading log events...</em>}
				{userEvents.error && <span className="text-danger">ERROR: {JSON.stringify(userEvents.error)}</span>}

				{_.size(userEvents.logEvents) > 0 ? (
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Challenge</th>
								<th scope="col">Distance <p className="Unit-text">(mi)</p></th>
								<th scope="col">Duration</th>
								<th scope="col">Ruck<p className="Unit-text">(lbs)</p></th>
								<th scope="col">Coupon<p className="Unit-text">(lbs)</p></th>
							</tr>
						</thead>
						<tbody>
							{userEvents.logEvents.map(({date, challenge, activity: {distance, duration = {}, couponWeight, ruckWeight }}, index) => (
								<tr key={`event_${index}`}>
									<td>{date}</td>
									<td>{challenge}</td>
									<td>{distance}</td>
									<td>{duration.hours || '00'}:{duration.minutes || '00'}:{duration.seconds || '00'}</td>
									<td>{ruckWeight}</td>
									<td>{couponWeight}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<h3>NO LOG EVENTS FOUND</h3>
				)}
			</div>
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