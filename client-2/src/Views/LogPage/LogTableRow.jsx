import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { EventForm } from '../EventForm';

import { userEventsActions } from '../../_actions';

class LogTableRow extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		this._formatDuration = this._formatDuration.bind(this);
	}
	
	handleDeleteEvent(eventId) {
		const { user} = this.props;
		this.props.dispatch(userEventsActions.delete(user.id, eventId));
	}

	_formatDuration(duration) {
		const hours = String(duration.hours || '0').padStart(2, '0'); 
		const minutes = String(duration.minutes || '0').padStart(2, '0'); 
		const seconds = String(duration.seconds || '0').padStart(2, '0'); 
		return `${hours}:${minutes}:${seconds}`
	}

	render() {
		const { event } = this.props;
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
		return (
			<tr id={`event_${id}`}>
				<td>{dayjs(date).format('MM/DD/YY')}</td>
				<td>{challenge || '-'}</td>
				<td>{distance || '-'}</td>
				<td>{this._formatDuration(duration)}</td>
				<td>{ruckWeight || '-'}</td>
				<td>{couponWeight || '-'}</td>
				<td>
					<EventForm
						buttonClassNames="btn-link text-dark Table-action"
						eventId={id}
					>
						<span className="far fa-edit Edit"/>
					</EventForm>
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
	const { userEvents, authentication } = state;
	const { user } = authentication;
	return {
		user,
		userEvents,
	};
}

const connectedLogTableRow = connect(mapStateToProps)(LogTableRow);
export { connectedLogTableRow as LogTableRow };