import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { EventForm } from '../EventForm';

import { userEventsActions } from '../_actions';

class LogTableRow extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
	}
	
	handleDeleteEvent(eventId) {
		const { user} = this.props;
		this.props.dispatch(userEventsActions.delete(user.id, eventId));
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
			},
		} = event;
		return (
			<tr key={`event_${id}`}>
				<td>{dayjs(date).format('MM/DD/YY')}</td>
				<td>{challenge}</td>
				<td>{distance}</td>
				<td>{duration.hours || '00'}:{duration.minutes || '00'}:{duration.seconds || '00'}</td>
				<td>{ruckWeight}</td>
				<td>{couponWeight}</td>
				<td>
					<EventForm
						buttonClassNames="btn-link text-dark Table-action"
						eventId={id}
					>
						<span className="far fa-edit Edit"/>
					</EventForm>
					{/* <button
						className="btn btn-link text-dark Table-action"
						type="button"
						onClick={() => {}}
					>
						<span className="far fa-edit Edit"/>
					</button> */}
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