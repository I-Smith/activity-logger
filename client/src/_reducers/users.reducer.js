import { userConstants, userStatuses } from '../_constants';

export function editingUsers(state = { items: []}, {type, payload}) {
	switch (type) {
		case userConstants.EDIT_REQUEST:
			return {
				items: [
					...state.items,
					payload.userId,
				]
			};
		case userConstants.EDIT_SUCCESS:
			return {
				items: _.reject(state.items, (userId) => userId === payload.response.id),
			};
		case userConstants.EDIT_FAILURE:
			return {
				error: payload.error,
				items: _.reject(state.items, (userId) => userId === payload.response.id),
			};

		default:
			return state;
	}
};

export function users(state = {}, {type, payload}) {
	switch (type) {
		case userConstants.GETALL_REQUEST:
			return {
				loading: true
			};
		case userConstants.GETALL_SUCCESS:
			return {
				items: payload.users
			};
		case userConstants.GETALL_FAILURE:
			return { 
				error: payload.error
			};
		
		case userConstants.EDIT_SUCCESS:
			return {
				items: [
					..._.reject(state.items, { id: payload.response.id }),
					payload.response,
				],
			};

		default:
			return state
	}
}
