import { userConstants } from '../_constants';

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
				items: _.remove(state.items, (userId) => userId === payload.response.id),
			};
		case userConstants.EDIT_FAILURE:
			return {
				error: payload.error,
				items: _.remove(state.items, (userId) => userId === payload.response.id),
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

export function unapprovedUsers(state = {}, {type, payload}) {
	switch (type) {
		
		case userConstants.GET_UNAPPROVED_REQUEST:
			return {
				loading: true,
			};
		case userConstants.GET_UNAPPROVED_SUCCESS:
			return {
				unapprovedUsers: payload.users
			};
		case userConstants.GET_UNAPPROVED_FAILURE:
			return { 
				error: payload.error,
			};

		case userConstants.EDIT_SUCCESS:
			return {
				...state,
				unapprovedUsers: (_.get(payload, 'response.approved', false))
					? _.reject(state.unapprovedUsers, { id: payload.response.id })
					: state.unapprovedUsers,
			};
		default:
			return state;
	}
}




