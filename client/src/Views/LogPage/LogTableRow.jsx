import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { EventForm } from '../EventForm';

import { userEventsActions } from '../../_actions';
import {
	getChallenges,
	getIsLoading as getIsChallengesLoading,
} from '../../_selectors/challenges.selectors';
import { formatDuration } from '../../util/formatDuration';

class LogTableRow extends React.Component {
	constructor(props) {
		super(props);

		this._getRuckWork = this._getRuckWork.bind(this);
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		this._formatDuration = this._formatDuration.bind(this);
	}
	
	handleDeleteEvent(eventId) {
		const { user} = this.props;
		this.props.dispatch(userEventsActions.delete(user.id, eventId));
	}

	_formatDuration() {
		const { event } = this.props;
		const seconds = parseFloat(_.get(event, 'activity.duration.seconds', 0));
		const minutes = parseFloat(_.get(event, 'activity.duration.minutes', 0));
		const hours = parseFloat(_.get(event, 'activity.duration.hours', 0));

		return formatDuration(hours, minutes, seconds);
	}

	_getRuckWork(distance, ruckWeight, couponWeight) {
		const dist = distance ? parseFloat(distance) : 0;
		const ruck = ruckWeight ? parseFloat(ruckWeight) : 0;
		const coupon = couponWeight ? parseFloat(couponWeight) : 0
		return _.round(((ruck + coupon) * dist));
	}
	render() {
		const { challenges, isChallengesLoading, event } = this.props;
		const {
			id,
			date,
			challenge,
			activity: {
				distance,
				duration = {},
				couponWeight,
				ruckWeight,
			} = {},
		} = event;
		const challengeName = _.get(_.find(challenges, { id: challenge }), 'name') || challenge;
		return (
			<tr id={`event_${id}`}>
				<td>{dayjs(date).format('MM/DD/YY')}</td>
				<td>{challengeName || '-'}</td>
				<td>{_.round(distance, 2) || '-'}</td>
				<td>{this._formatDuration()}</td>
				<td>{ruckWeight || '-'}</td>
				<td>{couponWeight || '-'}</td>
				<td>{this._getRuckWork(distance, ruckWeight, couponWeight)}</td>
				<td>

					{isChallengesLoading ?(
						<div className="spinner-border spinner-border-sm text-light ml-2" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<EventForm
							buttonClassNames="btn-link text-dark Table-action"
							eventId={id}
						>
							<span className="far fa-edit Edit"/>
						</EventForm>
					)}
					<button
						className="btn btn-link text-dark Table-action"
						type="button"
						onClick={() => this.handleDeleteEvent(id)}
					>
						<span className="far fa-trash-alt Delete"/>
					</button>
				</td>
			</tr>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state.authentication;
	return {
		challenges: getChallenges(state),
		isChallengesLoading: getIsChallengesLoading(state),
		user,
	};
}

const connectedLogTableRow = connect(mapStateToProps)(LogTableRow);
export { connectedLogTableRow as LogTableRow };