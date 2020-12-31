import { userConstants } from '../_constants';

const initialState = {};

export function registration(state = initialState, action) {
	switch (action.type) {
		case userConstants.REGISTER_REQUEST:
			return {
				loading: true,
			};
		case userConstants.REGISTER_SUCCESS:
			return {
				succeeded: true,
				message: action.response.message,
			};
		case userConstants.REGISTER_FAILURE:
			return {
				failed: true,
			};
		default:
			return state;
	}
}