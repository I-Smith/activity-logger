import createReducer from '../createReducer';
import {
	LOAD_WEATHER_DATA,
	LOAD_WEATHER_DATA_RESPONSE,
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

reducers[LOAD_WEATHER_DATA_RESPONSE] = (state, { payload }) => ({
	details: payload.body,
	status: payload.status === 200 ?
		'Success':
		'Failure',
	error: payload.error,
});

reducers[LOAD_WEATHER_DATA] = (state) => ({
	status: 'Pending',
});
