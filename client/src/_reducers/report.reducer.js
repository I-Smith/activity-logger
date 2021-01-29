import _ from 'lodash';
import { challengesConstants } from '../_constants';

export function report(state = {}, {type, payload}) {
	switch (type) {
		case challengesConstants.GETREPORT_REQUEST:
			return [
				..._.reject(state, { key: payload.challengeId }),
				{
					key: payload.challengeId,
					isLoading: true,
				}
			];
		case challengesConstants.GETREPORT_SUCCESS:
			return [
				..._.reject(state, { key: payload.challengeId }),
				{
					key: payload.challengeId,
					...payload.report,
				}
			]
		case challengesConstants.GETREPORT_FAILURE:
			return [
				..._.reject(state, { key: payload.challengeId }),
				{
					key: payload.challengeId,
					error: payload.error,
				}
			]
		default:
			return state
	}
}