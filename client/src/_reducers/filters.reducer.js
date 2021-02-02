import _ from 'lodash';
import { CHALLENGE, END_DATE, START_DATE } from '../util/filterTypes';
import { filtersConstants } from '../_constants';

const initialState = {
	[CHALLENGE]: '',
	[START_DATE]: '',
	[END_DATE]: '',
};

export function filters(state = initialState, { type, payload }) {
	switch (type) {
		case filtersConstants.SET_FILTER:

			return {
				...state,
				[payload.name]: payload.value,
			}
			// return _.map(state, (filter) => {
			// 	if (filter.name === payload.name) {
			// 		return {
			// 			...filter,
			// 			value: payload.value,
			// 		}
			// 	}
			// });
		
		default:
			return state
	}
}
