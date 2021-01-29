import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { challengesActions } from '../../../_actions';

class DeleteChallengeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleDeleteEvent() {
		const { challengeId } = this.props;
		this.props.dispatch(challengesActions.delete(challengeId));
		this.setState({ isOpen: false });
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
			name,
		} = this.props;
		const {
			isOpen,
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
					contentLabel="Delete Challenge"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="modalLabel">Delete Challenge</h5>
								<button
									className="close"
									type="button"
									aria-label="Close"
									onClick={this.handleClose}
								>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body text-center">
								<form>
									<p>Are you sure you want to delete the <strong>{name}</strong> Challenge?</p>
									<p>This may cause issues if users have logged activity for this Challenge.</p>
								</form>
								<div className="mt-4 col-md-6 offset-md-3">
									<button
										type="button"
										className="btn btn-primary mr-2"
										onClick={this.handleDeleteEvent}
									>
										Delete
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
	const { name } = _.find(challenges, { id: challengeId }) || {};
	return {
		name,
	};
}

const connectedDeleteChallengeForm = connect(mapStateToProps)(DeleteChallengeForm);
export { connectedDeleteChallengeForm as DeleteChallengeForm };
