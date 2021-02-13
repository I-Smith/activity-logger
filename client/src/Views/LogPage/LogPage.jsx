import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { EventForm } from '../EventForm';
import { LogTableRow } from './LogTableRow';

import { challengesActions, userEventsActions } from '../../_actions';
import {
	getChallenges,
	getIsLoading as getIsChallengesLoading,
} from '../../_selectors/challenges.selectors';
import {
	getFilteredLogEvents,
	getIsLoading as getIsUserEventsLoading,
} from '../../_selectors/user-events.selectors';
import { getEventsTotals } from '../../util/event.util';
import { Filters } from './Filters';

class LogPage extends React.Component {
	constructor(props) {
		super(props);

		this._getTotals = this._getTotals.bind(this);
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		this.props.dispatch(userEventsActions.getAll(user.id));
		this.props.dispatch(challengesActions.getAll());
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

	_getTotals() {
		const { userEvents } = this.props;
		return getTotals(filteredLogEvents);
	}

	render() {
		const {
			filteredLogEvents,
			isChallengesLoading,
			user,
			userEvents,
			location,
		} = this.props;
		const {
			formattedDuration,
			totalDistance,
			totalWeight,
			totalWork,
		} = getEventsTotals(filteredLogEvents);

		return (
			<div className="mx-auto text-center">
				<h3 className="mb-2">
					Hello, {user.firstName}. Welcome to the Activity Tracker!
				</h3>
				<h5><a href="https://www.instagram.com/rucksonparade" target="_blank">&#x23;ComeWithItNow</a></h5>
				<h5><a href="https://www.instagram.com/rucksonparade" target="_blank">&#x23;RucksOnParade</a></h5>

				{/********** Totals jumbotron **********/}
				<div className="jumbotron mt-4">
					<h3 className="mt-0 mb-2"><strong>Activity Totals</strong></h3>
					<div className="row">
						<div className="col-md-4 mt-2">
							<h4><strong>Distance</strong>
								<p className="Tooltip"> &#x24D8;
									<span className="tooltiptext">miles</span>
								</p>
							</h4>
							<h4>{totalDistance}</h4>
						</div>
						<div className="col-md-4 mt-2">
							<h4><strong>Duration</strong>
								<p className="Tooltip"> &#x24D8;
									<span className="tooltiptext">hours:minutes:seconds</span>
								</p>
							</h4>
							<h4>{formattedDuration}</h4>
						</div>
						<div className="col-md-4 mt-2">
							<h4><strong>Work</strong>
								<p className="Tooltip"> &#x24D8;
									<span className="tooltiptext">(Ruck &#x2B; Coupon) &#xD7; Distance</span>
								</p>
							</h4>			
							<h4>{totalWork}</h4>
						</div>
					</div>
				</div>
				{/********** END Totals jumbotron **********/}

				<div className="mt-4">

					{/********** Add Event Button **********/}
					{isChallengesLoading ? (
						<div className="spinner-border spinner-border-sm text-light ml-2" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<EventForm
							buttonClassNames="btn-success"
						>
							Add New Activity
						</EventForm>
					)}
					{/********** END Add Event Button **********/}

					<div className="mt-2">
						{userEvents.loading && (
							<div className="spinner-border text-secondary" role="status">
								<span className="sr-only">Loading log events...</span>
							</div>
						)}
						{userEvents.error && <span className="text-danger">Action could not be complete at this time.</span>}
						{/* {userEvents.error && <span className="text-danger">ERROR: {JSON.stringify(userEvents.error)}</span>} */}
					</div>

					{/********** Events table **********/}
					{_.size(userEvents.logEvents) > 0 && <Filters />}
					{_.size(filteredLogEvents) > 0 ? (
						<table className="table table-responsive-lg table-striped table-hover mt-2">
							<thead>
								<tr>
									<th scope="col">Date</th>
									<th scope="col">Challenge</th>
									<th scope="col">Distance<p className="Unit-text">(mi)</p></th>
									<th scope="col">Duration</th>
									<th scope="col">Ruck<p className="Unit-text">(lbs)</p></th>
									<th scope="col">Coupon<p className="Unit-text">(lbs)</p></th>
									<th scope="col">Work</th>
									<th scope="col">Edit/Delete</th>
								</tr>
							</thead>
							<tbody>
								{_.map(_.sortBy(filteredLogEvents, 'date').reverse(), (event, index) => (
									<LogTableRow
										event={event}
										key={index}
									/>
								))}
							</tbody>
						</table>
					) : (
						<div className="mt-3">
							{
								!userEvents.loading && (<h3 className="text-secondary">NO LOG EVENTS FOUND</h3>)
							}
							{
								!userEvents.loading && _.size(userEvents.logEvents) > 0 && (<h3 className="text-secondary">FOR CURRENT FILTER SELECTION</h3>)
							}
						</div>
					)}
					{/********** END Events table **********/}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { challenges, userEvents, authentication } = state;
	const { user } = authentication;
	
	return {
		isChallengesLoading: getIsChallengesLoading(state),
		filteredLogEvents: getFilteredLogEvents(state),
		user,
		userEvents,
	};
}

const connectedLogPage = connect(mapStateToProps)(LogPage);
export { connectedLogPage as LogPage };