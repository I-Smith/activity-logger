import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { ChallengeForm } from './ChallengeForm';
import { DeleteChallengeForm } from './DeleteChallengeForm';

import { challengesActions } from '../../../_actions';
import { GenerateReportButton } from '../Reports';

class Challenges extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
	}

	// componentDidMount() {
	// 	this.props.dispatch(challengesActions.getAll());
	// }

	// componentDidUpdate(prevProps) {
	// 	const { challenges } = this.props;
	// 	if (challenges.needsReload && !prevProps.challenges.needsReload) {
	// 		this.props.dispatch(challengesActions.getAll());
	// 	}
	// }

	
	handleDeleteEvent(challengeId) {
		this.props.dispatch(challengesActions.delete(challengeId));
	}

	render() {
		const {
			challenges,
			error,
			loading,
		} = this.props;
		return (
			// <div className="col-md-6">
			<div>
				<h3 className="mt-5">
					Challenges
				</h3>
				<div className="mt-4">
					<ChallengeForm
						buttonClassNames="btn-success"
					>
						Add New Challenge
					</ChallengeForm>
					<div className="mt-2">
						{loading && (
							<div className="spinner-border text-secondary" role="status">
								<span className="sr-only">Loading challenges...</span>
							</div>
						)}
						{error && <span className="text-danger">Action could not be complete at this time.</span>}
						{/* {error && <span className="text-danger">ERROR: {JSON.stringify(error)}</span>} */}
					</div>

					{_.size(challenges) > 0 ? (
						<table className="table table-sm table-responsive-sm table-striped table-hover mt-2 mx-auto">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Start Date</th>
									<th scope="col">End Date</th>
									<th scope="col">Edit/Delete</th>
									<th scope="col">Report</th>
								</tr>
							</thead>
							<tbody>
								{_.map(_.sortBy(challenges, 'startDate').reverse(), (challenge, index) => (
									<tr
										key={index}
										id={`challenge_${challenge.id}`}
									>
										<td>{challenge.name || '-'}</td>
										<td>{dayjs(challenge.startDate).format('MM/DD/YY')}</td>
										<td>{dayjs(challenge.endDate).format('MM/DD/YY')}</td>
										<td>
											<ChallengeForm
												buttonClassNames="btn-link text-dark Table-action"
												challengeId={challenge.id}
											>
												<span className="far fa-edit Edit"/>
											</ChallengeForm>
											<DeleteChallengeForm
												buttonClassNames="btn-link text-dark Table-action"
												challengeId={challenge.id}
											>
												<span className="far fa-trash-alt Delete"/>
											</DeleteChallengeForm>
										</td>
										<td>
											<GenerateReportButton
												buttonClassNames="btn-info"
												challengeId={challenge.id}
											>
												Generate Report
											</GenerateReportButton>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						!loading && <h3 className="text-secondary">NO CHALLENGES FOUND</h3>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { challenges, error, loading } = state.challenges;
	const { user } = state.authentication;
	return {
		challenges,
		error,
		loading,
		user,
	};
}

const connectedChallenges = connect(mapStateToProps)(Challenges);
export { connectedChallenges as Challenges };