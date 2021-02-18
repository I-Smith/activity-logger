import _ from 'lodash';
import { userStatuses } from '../_constants';

/******************** Editing Users store ********************/
const getEditingUsersStore = (store) => store.editingUsers;

export const getEditingUsers = (store) => _.get(getEditingUsersStore(store), 'items', []);
export const getIsEditingUsersError = (store) => !!(getEditingUsersStore(store).error);
export const getIsUserEditing = (store, userId) => _.includes(getEditingUsers(store), userId);


/******************** Users store ********************/
const getUsersStore = (store) => store.users;

export const getUsers = (store) => _.get(getUsersStore(store), 'items', []);
export const getIsUsersLoading = (store) => _.get(getUsersStore(store), 'isLoading', false);
export const getIsUsersError = (store) => !!(getUsersStore(store).error);

// export const getActiveUsers = (store) => _.filter(getUsers(store), { status: userStatuses.ACTIVE });
// export const getDeniedUsers = (store) => _.filter(getUsers(store), { status: userStatuses.DENIED });
// export const getLockedUsers = (store) => _.filter(getUsers(store), { status: userStatuses.LOCKED });
// export const getUnreviewedUsers = (store) => _.filter(getUsers(store), { status: userStatuses.UNREVIEWED });

export const getUsersByStatus = (store, status) => _.filter(getUsers(store), {status});