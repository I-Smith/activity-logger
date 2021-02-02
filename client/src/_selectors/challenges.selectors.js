import _ from 'lodash';

const getChallengesStore = (store) => store.challenges;

export const getIsCreating = (store) => _.get(getChallengesStore(store), 'creating', false);
export const getIsDeleting = (store) => _.get(getChallengesStore(store), 'deleting', false);
export const getIsLoading = (store) => _.get(getChallengesStore(store), 'loading', false);
export const getIsUpdating = (store) => _.get(getChallengesStore(store), 'updating', false);

export const getNeedsReload = (store) => _.get(getChallengesStore(store), 'needsReload', false);

export const getChallenges = (store) => _.get(getChallengesStore(store), 'challenges', []);