import _ from 'lodash';
import { CHALLENGE } from '../util/filterTypes';
import { getChallenges } from './challenges.selectors';
import { getFilters } from './filters.selectors';

const getUserEventsStore = (store) => store.userEvents;

export const getIsCreating = (store) => _.get(getUserEventsStore(store), 'creating', false);
export const getIsDeleting = (store) => _.get(getUserEventsStore(store), 'deleting', false);
export const getIsErrored = (store) => !!_.get(getUserEventsStore(store), 'error', false);
export const getIsLoading = (store) => _.get(getUserEventsStore(store), 'loading', false);
export const getIsUpdating = (store) => _.get(getUserEventsStore(store), 'updating', false);

export const getNeedsReload = (store) => _.get(getUserEventsStore(store), 'needsReload', false);

export const getLogEvents = (store) => _.get(getUserEventsStore(store), 'logEvents', []);


/**
 * Combined selectors.
 */

export const getFilteredLogEvents = (store) => {
	const filters = getFilters(store);
	const challengeIds = _.map(getChallenges(store), (challenge) => challenge.id);
	const selectedChallenge = filters[CHALLENGE];
	
	if (selectedChallenge === '') return getLogEvents(store);
	if (selectedChallenge === 'Other') {
		return _.filter(getLogEvents(store), (logEvent) => (
			!_.includes(challengeIds, logEvent.challenge)
		));
	}
	return _.filter(getLogEvents(store), { challenge: selectedChallenge });
};
