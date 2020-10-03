import createReducer from '../createReducer';
import {
	LOG_EVENT,
	// LOG_EVENT_RESPONSE,
} from '../actionTypes';

// {Dictionary of functions} - Holds all the reducers
const reducers = {};
const initialState = [];

/**
 * Main reducer function that provides routing to correct function.
 * 
 * @param {object} state - The currect state.
 * @param {object} action - The action to process.
 * @returns {object} - The next state.
 */
export default (state, action) => createReducer(state, action, reducers, initialState);

// reducers[LOG_EVENT_RESPONSE] = (state, { payload }) => ({
// 	details: payload.body,
// 	status: payload.status === 200 ?
// 		'Success':
// 		'Failure',
// 	error: payload.error,
// });

reducers[LOG_EVENT] = (state, { payload: { event } }) => ([
    ...state,
    {
        ...event,
    }
]);
