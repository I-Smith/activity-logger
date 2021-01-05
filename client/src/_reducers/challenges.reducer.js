import _ from 'lodash';
import { challengesConstants } from '../_constants';

const initialState = {
	needsReload: false,
	loading: false,
	creating: false,
	deleting: false,
	updating: false,
	challenges: [],
}

export function challenges(state = initialState, { type, response, error }) {
	switch (type) {
		case challengesConstants.GETALL_REQUEST:
			return {
				...state,
				loading: true,
			};
		case challengesConstants.GETALL_SUCCESS:
			return {
				...state,
				loading: false,
				challenges: response,
			};
		case challengesConstants.GETALL_FAILURE:
			return { 
				...state,
				loading: false,
				challenges: [],
				error,
			};
		
		case challengesConstants.CREATE_REQUEST:
			return {
				...state,
				creating: true,
			};
		case challengesConstants.CREATE_SUCCESS:
			return {
				...state,
				creating: false,
				needsReload: true,
				challenges: [
					...state.challenges,
					response,
				],
			};
		case challengesConstants.CREATE_FAILURE:
			return { 
				...state,
				creating: false,
				error,
			};
		
		case challengesConstants.DELETE_REQUEST:
			return {
				...state,
				deleting: true,
			};
		case challengesConstants.DELETE_SUCCESS:
			return {
				...state,
				deleting: false,
				needsReload: true,
				challenges: _.reject(state.challenges, { id: response.challengeId }),
			};
		case challengesConstants.DELETE_FAILURE:
			return { 
				...state,
				deleting: false,
				error,
			};
		
		case challengesConstants.EDIT_REQUEST:
			return {
				...state,
				updating: true,
			};
		case challengesConstants.EDIT_SUCCESS:
			return {
				...state,
				updating: false,
				needsReload: true,
				challenges: [
					..._.reject(state.challenges, { id: response.id }),
					response,
				],
			};
		case challengesConstants.EDIT_FAILURE:
			return { 
				...state,
				updating: false,
				error,
			};

		default:
			return state
	}
}