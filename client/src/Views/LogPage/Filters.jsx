import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import { filtersActions } from '../../_actions';
import {
	getChallenges,
	getIsLoading as getIsChallengesLoading,
} from '../../_selectors/challenges.selectors';
import { getFilters } from '../../_selectors/filters.selectors';
import { CHALLENGE, END_DATE, START_DATE } from '../../util/filterTypes';


import "react-datepicker/dist/react-datepicker.css";

class Filters extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		
		this.props.dispatch(filtersActions.setFilterValue(name, value));
	}

	handleDateChange(date) {
		this.setState({ startDate: date });
	}
	
	render() {
		const {
			challenges,
			filters,
		} = this.props;

		return (
			<div className="mt-4 row">
				<div className="col-md-2">
					<p className="mt-2">FILTER: </p>
				</div>
				<div className="col-md-3">
					<select className="form-control" name={CHALLENGE} value={filters[CHALLENGE]} onChange={this.handleChange}>
						<option value="">All Challenges</option>
						{_.map(challenges, (challenge) => (
							<option 
								key={`challenge_${challenge.id}`}
								value={challenge.id}
							>
								{challenge.name}
							</option>
						))}
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="col-md-2">
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { userEvents } = state;
	
	return {
		challenges: getChallenges(state),
		filters: getFilters(state),
		isChallengesLoading: getIsChallengesLoading(state),
	};
}

const connectedFilters = connect(mapStateToProps)(Filters);
export { connectedFilters as Filters };