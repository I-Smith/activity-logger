import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import { userEventsActions } from '../../_actions';
import "react-datepicker/dist/react-datepicker.css";

const initialFormState = {
	challenge: '',
	customChallenge: '',
	couponWeight: '',
	distance: '',
	hours: '',
	minutes: '',
	notes: '',
	ruckWeight: '',
	seconds: '',
	startDate: Date.now(),
};

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialFormState,
			isOpen: false,
		};
		this.handleCreateUpdateEvent = this.handleCreateUpdateEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}
	

	handleCreateUpdateEvent() {
		const { eventId, user } = this.props;
		const {
			challenge,
			customChallenge,
			couponWeight,
			distance,
			hours,
			minutes,
			notes,
			ruckWeight,
			seconds,
			startDate,
		} = this.state;
		const eventOptions = {
			date: dayjs(startDate).format('YYYY-MM-DD'),
			challenge: challenge === 'Other' ? customChallenge : challenge,
			activity: {
				distance: distance || undefined,
				duration: {
					hours: hours || undefined,
					minutes: minutes || undefined,
					seconds: seconds || undefined,
				},
				couponWeight: couponWeight || undefined,
				ruckWeight: ruckWeight || undefined,
				notes: notes || undefined,
			},
		};
		if (eventId) {
			this.props.dispatch(userEventsActions.edit(user.id, eventId, eventOptions));
		} else {
			this.props.dispatch(userEventsActions.create(user.id, eventOptions));
		}
		this.setState({ isOpen: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		// console.log(`${name}: ${value}`);
		this.setState({ [name]: value });
	}

	handleDateChange(date) {
		this.setState({ startDate: date });
	}

	handleClose() {
		this.setState({ isOpen: false });
	}

	handleOpen() {
		const { challenges, eventId, event } = this.props;
		const { challenge, date, activity = {} } = event;
		if (eventId) {
			const challengeName = _.get(_.find(challenges, { id: challenge }), 'name');
			this.setState({
				isOpen: true,
				challenge: challengeName ? challenge : 'Other',
				customChallenge: challengeName ? '' : challenge,
				couponWeight: activity && activity.couponWeight,
				distance: activity && activity.distance,
				hours: activity && activity.duration && activity.duration.hours,
				minutes: activity && activity.duration && activity.duration.minutes,
				notes: activity && activity.notes,
				ruckWeight: activity.ruckWeight,
				seconds: activity && activity.duration && activity.duration.seconds,
				startDate: new Date(dayjs(date).format('MM/DD/YY')),
			});
		} else {
			this.setState({
				...initialFormState,
				isOpen: true,
			});
		}
	}

	render() {
		const {
			buttonClassNames,
			challenges,
			children,
			eventId,
			event,
			user,
		} = this.props;
		const {
			challenge,
			customChallenge,
			couponWeight,
			distance,
			hours,
			isOpen,
			minutes,
			notes,
			ruckWeight,
			seconds,
			startDate,
		} = this.state;
		return (	
			<React.Fragment>
				<button
					className={`btn ${buttonClassNames}`}
					type="button"
					onClick={this.handleOpen}
				>
					{children}
				</button>
				<Modal
					isOpen={isOpen}
					// style={modalStyles}
					className="Modal"
					contentLabel={event ? "Edit Event" : "Add New Event"}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="modalLabel">{eventId ? "Edit Event" : "Add New Event"}</h5>
								<button
									className="close"
									type="button"
									aria-label="Close"
									onClick={this.handleClose}
								>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group col-md-6">
										<label htmlFor="inputDate">Date</label>
										<div className="row">
											<DatePicker className="ml-3" id="inputDate" selected={startDate} onChange={date => this.handleDateChange(date)} />
										</div>
									</div>
									<div className="col">
										<label htmlFor="challenge">Challenge</label>
										<div className="form-row">
											<div className="form-group col-md-6">
												<select className="form-control" name="challenge" value={challenge} onChange={this.handleChange}>
													<option value="">Select challenge...</option>
													{_.map(challenges, (challenge) => (
														<option 
															key={`challenge_${challenge.id}`}
															value={challenge.id}
														>
															{challenge.name}
														</option>
													))}
													<option value="Other">Other...</option>
												</select>

											</div>
											<div className={`form-group col-md-5 ${challenge === 'Other' ? '' : 'd-none'}`}>
												<input type="text" className="form-control" name="customChallenge" value={customChallenge} placeholder="My Challenge" onChange={this.handleChange} />
											</div>
										</div>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="distance">Distance</label>
										<input type="text" className="form-control" name="distance" value={distance} placeholder="miles" onChange={this.handleChange} />
									</div>
									<div className="col">
										<label htmlFor="">Duration</label>
										<div className="form-row">
											<div className="form-group col-md-2">
												<input type="text" className="form-control" name="hours" value={hours} placeholder="hh" onChange={this.handleChange} />
												<label htmlFor="hours">Hours</label>
											</div>
											<div className="form-group col-md-2">
												<input type="text" className="form-control" name="minutes" value={minutes} placeholder="mm" onChange={this.handleChange} />
												<label htmlFor="minutes">Minutes</label>
											</div>
											<div className="form-group col-md-2">
												<input type="text" className="form-control" name="seconds" value={seconds} placeholder="ss" onChange={this.handleChange} />
												<label htmlFor="seconds">Seconds</label>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="form-row">
											<div className="form-group col-md-4">
												<label htmlFor="ruckWeight">Ruck</label>
												<input type="text" className="form-control" name="ruckWeight" value={ruckWeight} placeholder="lbs" onChange={this.handleChange} />
											</div>
											<div className="form-group col-md-4">
												<label htmlFor="couponWeight">Coupon</label>
												<input type="text" className="form-control" name="couponWeight" value={couponWeight} placeholder="lbs" onChange={this.handleChange} />
											</div>
										</div>
									</div>
									<div className="form-group col">
										<label htmlFor="notes">Notes</label>
										<textarea type="text" className="form-control" name="notes" value={notes} placeholder="Additional Thoughts..." onChange={this.handleChange} />
									</div>
								</form>
								<div className="mt-4 col-md-6">
									<button
										type="button"
										className="btn btn-primary mr-2"
										onClick={this.handleCreateUpdateEvent}
									>
										{eventId ? 'Save changes' : 'Add Event'}
									</button>
									<button
										type="button"
										className="btn btn-secondary"
										onClick={this.handleClose}
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, { eventId }) {
	const { challenges } = state.challenges;
	const { user } = state.authentication;
	const event = _.find(state.userEvents.logEvents, { id: eventId }) || {};
	return {
		challenges,
		event,
		user,
	};
}

const connectedEventForm = connect(mapStateToProps)(EventForm);
export { connectedEventForm as EventForm };
