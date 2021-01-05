import { userConstants } from '../../_constants';

const initialState = {};

export function forgotPassword(state = initialState, action) {
	switch (action.type) {
		case userConstants.FORGOT_PASSWORD_REQUEST:
			return {
				loading: true,
			};
		case userConstants.FORGOT_PASSWORD_SUCCESS:
			return {
				succeeded: true,
				message: action.response.message,
			};
		case userConstants.FORGOT_PASSWORD_FAILURE:
			return {
				failed: true,
			};
		default:
			return state;
	}
}