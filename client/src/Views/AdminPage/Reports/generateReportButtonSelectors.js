import _ from 'lodash';
import dayjs from 'dayjs';
import {
	getIsError as _getIsError,
	getIsLoading as _getIsLoading,
	getReportChallengeData,
	getReportUserData,
} from '../../../_selectors/report.selectors';
import { getEventsTotals } from '../../../util/event.util';

export const getIsLoading = _getIsLoading;

export const getIsError = (store, challengeId) => {
	return _getIsError(store, challengeId) || _.isEmpty(getReportUserData(store, challengeId));
};

export const getReportData = (store, challengeId) => {
	const userData = getReportUserData(store, challengeId);
	
	return _.map(userData, (user) => {
		const userTotals = getEventsTotals(user.logEvents);
		return { 
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			eventCount: userTotals.eventCount,
			totalDistance: userTotals.totalDistance,
			totalDuration: userTotals.formattedDuration,
			totalWeight: userTotals.totalWeight,
			totalWork: userTotals.totalWork,
		}
	});
};

export const getReportName = (store, challengeId) => {
	const { name } = getReportChallengeData(store, challengeId);

	return `Report for ${name} (as of ${dayjs().format('MM-DD-YYYY')}).csv`;
};