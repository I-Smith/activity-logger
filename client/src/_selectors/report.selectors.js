import _ from 'lodash';

const getReportStore = (store) => store.report;

export const getReport = (store, challengeId) => _.find(getReportStore(store), { key: challengeId }) || {};

export const getIsLoading = (store, challengeId) => _.get(getReport(store, challengeId), 'isLoading', false);

export const getIsError = (store, challengeId) => !!(getReport(store, challengeId).error);

export const getReportChallengeData = (store, challengeId) => _.get(getReport(store, challengeId), 'challenge', {});

export const getReportUserData = (store, challengeId) => _.get(getReport(store, challengeId), 'users', []);