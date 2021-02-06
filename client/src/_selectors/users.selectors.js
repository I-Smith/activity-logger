import _ from 'lodash';

/******************** Editing Users store ********************/
const getEditingUsersStore = (store) => store.editingUsers;

export const getEditingUsers = (store) => _.get(getEditingUsersStore(store), 'items', []);
export const getIsEditingUsersError = (store) => !!(getEditingUsersStore(store).error);
export const getIsUserEditing = (store, userId) => _.includes(getEditingUsers(store), userId);


/******************** Unapproved Users store ********************/
const getUnapprovedUsersStore = (store) => store.unapprovedUsers;

export const getUnapprovedUsers = (store) => _.get(getUnapprovedUsersStore(store), 'unapprovedUsers', []);
export const getIsUnapprovedUsersLoading = (store) => _.get(getUnapprovedUsersStore(store), 'isLoading', false);
export const getIsUnapprovedUsersError = (store) => !!(getUnapprovedUsersStore(store).error);