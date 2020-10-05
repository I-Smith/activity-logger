import dayjs from 'dayjs';
// import { postEvent } from './logEventApi';
import {
	LOG_EVENT,
	LOG_EVENT_RESPONSE,
} from '../actionTypes';

export const logEventResponse = ({ body, status, error }) => (dispatch) => (
	dispatch({
		type: LOG_EVENT_RESPONSE,
		payload: {
			body,
			status,
			error,
		},
	})
);

export const logEvent = () => (dispatch) => {
	return dispatch({
		type: LOG_EVENT,
		payload: {
			event: {
				text: 'TEST STUFF',
				timestamp: dayjs().format('MM/DD/YY HH:mm'),
			},
		},
	});
	// return postEvent()
	// 	.then((response) => (logEventResponse(response)))
};