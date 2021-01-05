import { userConstants } from '../../_constants';

const initialState = {};

export function resetPassword(state = initialState, action) {
	switch (action.type) {
		case userConstants.RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			};
		case userConstants.RESET_PASSWORD_SUCCESS:
			return {
				succeeded: true,
				message: action.response.message,
			};
		case userConstants.RESET_PASSWORD_FAILURE:
			return {
				failed: true,
				error: action.error,
			};
		default:
			return state;
	}
}