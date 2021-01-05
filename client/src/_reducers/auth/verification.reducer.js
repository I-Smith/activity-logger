import { userConstants } from '../../_constants';

const initialState = {};

export function verification(state = initialState, action) {
	switch (action.type) {
		case userConstants.VERIFY_REQUEST:
			return {
				loading: true,
			};
		case userConstants.VERIFY_SUCCESS:
			return {
				succeeded: true,
				message: action.response.message,
			};
		case userConstants.VERIFY_FAILURE:
			return {
				failed: true,
				error: action.error,
			};
		default:
			return state;
	}
}