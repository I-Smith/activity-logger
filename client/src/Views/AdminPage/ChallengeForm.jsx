import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import { challengesActions } from '../../_actions';
import "react-datepicker/dist/react-datepicker.css";

class ChallengeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			name: '',
			formStartDate: Date.now(),
			formEndDate: Date.now(),
		};
		this.handleCreateUpdateEvent = this.handleCreateUpdateEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}
	
	componentDidMount() {
		const { challengeId, challenge } = this.props;
		const { name, startDate, endDate } = challenge;
		console.log(JSON.stringify(challenge));
		if (challengeId) {
			this.setState({
				name,
				formStartDate: new Date(dayjs(startDate).format('MM/DD/YY')),
				formEndDate:  new Date(dayjs(endDate).format('MM/DD/YY')),
			});
		}
	}

	handleCreateUpdateEvent() {
		const { challengeId, user } = this.props;
		const {
			name,
			formStartDate,
			formEndDate,
		} = this.state;
		const challengeOptions = {
			name,
			startDate: dayjs(formStartDate).format('YYYY-MM-DD'),
			endDate: dayjs(formEndDate).format('YYYY-MM-DD'),
		};
		if (challengeId) {
			this.props.dispatch(challengesActions.edit(challengeId, challengeOptions));
		} else {
			this.props.dispatch(challengesActions.create(challengeOptions));
		}
		this.setState({ isOpen: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleStartDateChange(date) {
		this.setState({ formStartDate: date });
	}
	handleEndDateChange(date) {
		this.setState({ formEndDate: date });
	}

	handleClose() {
		this.setState({ isOpen: false });
	}

	handleOpen() {
		this.setState({ isOpen: true });
	}

	render() {
		const {
			buttonClassNames,
			children,
			challengeId,
			challenge,
			user,
		} = this.props;
		const {
			isOpen,
			name,
			formStartDate,
			formEndDate,
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
					contentLabel={challenge ? "Edit Challenge" : "Add New Challenge"}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="modalLabel">{challengeId ? "Edit Challenge" : "Add New Challenge"}</h5>
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
										<label htmlFor="distance">Challenge Name</label>
										<input type="text" className="form-control" name="name" value={name} placeholder="January Challenge" onChange={this.handleChange} />
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="startDate">Start Date</label>
										<DatePicker id="startDate" selected={formStartDate} onChange={date => this.handleStartDateChange(date)} />
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="endDate">End Date</label>
										<DatePicker id="endDate" selected={formEndDate} onChange={date => this.handleEndDateChange(date)} />
									</div>
								</form>
								<div className="mt-4 col-md-8">
									<button
										type="button"
										className="btn btn-primary mr-2"
										onClick={this.handleCreateUpdateEvent}
									>
										{challengeId ? 'Save changes' : 'Add Challenge'}
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

function mapStateToProps(state, { challengeId }) {
	const { challenges } = state.challenges;
	const { user } = state.authentication;
	const challenge = _.find(challenges, { id: challengeId }) || {};
	return {
		challenge,
		user,
	};
}

const connectedChallengeForm = connect(mapStateToProps)(ChallengeForm);
export { connectedChallengeForm as ChallengeForm };
