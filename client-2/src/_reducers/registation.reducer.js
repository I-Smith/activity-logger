import { userConstants } from '../_constants';

const initialState = {};

export function authentication(state = initialState, action) {
	switch (action.type) {
		case userConstants.REGISTER_REQUEST:
			return {
				loading: true,
			};
		case userConstants.REGISTER_SUCCESS:
			return {
				succeeded: true,
			};
		case userConstants.REGISTER_FAILURE:
			return {
				failed: true,
			};
		default:
			return state
	}
}