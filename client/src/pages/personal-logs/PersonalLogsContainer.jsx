// This is a component that shows the 
// user the summary of the weather for the day

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getEvents,
} from './personalLogsSelectors';
import PersonalLogsView from './PersonalLogsView';
import { logEvent } from '../../store/event/eventActions'

class PersonalLogsContainer extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick() {
		const { actions } = this.props;
		actions.logEvent();
	}

	render() {
		const {
			events,
		} = this.props;
		return (
			<PersonalLogsView
				events={events}
				handleClick={this._handleClick}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	events: getEvents(state),
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		logEvent,
	}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalLogsContainer);