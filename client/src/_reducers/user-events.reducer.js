import _ from 'lodash';
import { userEventsConstants } from '../_constants';

const initialState = {
	needsReload: false,
	loading: false,
	creating: false,
	deleting: false,
	updating: false,
	logEvents: [],
}

export function userEvents(state = initialState, { type, response, error }) {
	switch (type) {
		case userEventsConstants.GETALL_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userEventsConstants.GETALL_SUCCESS:
			return {
				...state,
				loading: false,
				logEvents: response.logEvents,
			};
		case userEventsConstants.GETALL_FAILURE:
			return { 
				...state,
				loading: false,
				logEvents: [],
				error,
			};
		
		case userEventsConstants.CREATE_REQUEST:
			return {
				...state,
				creating: true,
			};
		case userEventsConstants.CREATE_SUCCESS:
			return {
				...state,
				creating: false,
				needsReload: true,
				logEvents: [
					...state.logEvents,
					response,
				],
			};
		case userEventsConstants.CREATE_FAILURE:
			return { 
				...state,
				creating: false,
				error,
			};
		
		case userEventsConstants.DELETE_REQUEST:
			return {
				...state,
				deleting: true,
			};
		case userEventsConstants.DELETE_SUCCESS:
			return {
				...state,
				deleting: false,
				needsReload: true,
				logEvents: _.reject(state.logEvents, { id: response.eventId }),
			};
		case userEventsConstants.DELETE_FAILURE:
			return { 
				...state,
				deleting: false,
				error,
			};
		
		case userEventsConstants.EDIT_REQUEST:
			return {
				...state,
				updating: true,
			};
		case userEventsConstants.EDIT_SUCCESS:
			return {
				...state,
				updating: false,
				needsReload: true,
				logEvents: [
					..._.reject(state.logEvents, { id: response.id }),
					response,
				],
			};
		case userEventsConstants.EDIT_FAILURE:
			return { 
				...state,
				updating: false,
				error,
			};

		default:
			return state
	}
}