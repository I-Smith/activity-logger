import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import {
	getIsLoading,
	getReportData,
	getReportName,
} from './generateReportButtonSelectors';
import { challengesActions } from '../../../_actions';
import { getIsError } from '../../../_selectors/report.selectors';

class GenerateReportButton extends React.Component {
	constructor(props) {
		super(props);

		// this.handleGenerate = this.handleGenerate.bind(this);
	}

	componentDidMount() {
		const {	challengeId } = this.props;
		this.props.dispatch(challengesActions.getReport(challengeId));
	}

	// handleGenerate() {
	// 	const {	challengeId } = this.props;
	// 	this.props.dispatch(challengesActions.getReport(challengeId));
	// }

	render() {
		const {
			buttonClassNames,
			children,
			isError,
			isLoading,
			reportData,
			reportName,
		} = this.props;

		const headers = [
			{ label: "First Name", key: "firstName" },
			{ label: "Last Name", key: "lastName" },
			{ label: "Email", key: "email" },
			{ label: 'Activities Logged', key: 'eventCount' },
			{ label: 'Total Distance', key: 'totalDistance' },
			{ label: 'Total Time', key: 'totalDuration' },
			{ label: 'Total Weight', key: 'totalWeight' },
			{ label: 'Total RuckWork', key: 'totalWork' },
			
		];
		return (
			<>
				{isLoading && (
					<div className="spinner-border spinner-border-sm text-dark ml-2" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				)}
				{isError && (
					<span className="text-danger">Report Unavailable</span>
				)}
				{!isLoading && !isError && (
					<CSVLink
						data={reportData}
						headers={headers}
						filename={reportName}
						className={`btn ${buttonClassNames}`}
					>
						{children}
					</CSVLink>
				)}
			</>
		);
	}
}

function mapStateToProps(state, { challengeId }) {
	// const { challenges, error, loading } = state.challenges;
	// const { user } = state.authentication;
	return {
		// challenges,
		// error,
		isError: getIsError(state, challengeId),
		isLoading: getIsLoading(state, challengeId),
		reportData: getReportData(state, challengeId),
		reportName: getReportName(state, challengeId),
	};
}

const connectedGenerateReportButton = connect(mapStateToProps)(GenerateReportButton);
export { connectedGenerateReportButton as GenerateReportButton };