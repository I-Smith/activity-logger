import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
	getAll,
	getUnapproved,
	edit,
	forgotPassword,
    login,
	logout,
	register,
	resetPassword,
	verify,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, payload: { users } } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, payload: { error } } }
}

function getUnapproved() {
	return dispatch => {
        dispatch(request());

        userService.getUnapproved()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GET_UNAPPROVED_REQUEST } }
    function success(users) { return { type: userConstants.GET_UNAPPROVED_SUCCESS, payload: { users } } }
    function failure(error) { return { type: userConstants.GET_UNAPPROVED_FAILURE, payload: { error } } }
}

function edit(userId, userOptions) {
    return dispatch => {
        dispatch(request(userId));

        userService.edit(userId, userOptions)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error, userId))
            );
    };

    function request(userId) { return { type: userConstants.EDIT_REQUEST, payload: { userId }} }
    function success(response) { return { type: userConstants.EDIT_SUCCESS, payload: { response }} }
    function failure(error, userId) { return { type: userConstants.EDIT_FAILURE, payload: { error, userId } } }
}


function forgotPassword(email) {
    return dispatch => {
        dispatch(request());

        userService.forgotPassword(email)
            .then(
                response => { 
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error));
				}
            );
    };

    function request() { return { type: userConstants.FORGOT_PASSWORD_REQUEST } }
    function success(response) { return { type: userConstants.FORGOT_PASSWORD_SUCCESS, response } }
    function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILURE, error } }
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(registerOptions) {
    return dispatch => {
        dispatch(request());

        userService.register(registerOptions)
            .then(
                response => { 
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error));
				}
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(response) { return { type: userConstants.REGISTER_SUCCESS, response } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function resetPassword(resetPasswordOptions) {
    return dispatch => {
        dispatch(request());

        userService.resetPassword(resetPasswordOptions)
            .then(
                response => { 
                    dispatch(success(response));
					history.push('/login');
					dispatch(alertActions.success(response.message));
                },
                error => {
                    dispatch(failure(error));
				}
            );
    };

    function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
    function success(response) { return { type: userConstants.RESET_PASSWORD_SUCCESS, response } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function verify(token) {
    return dispatch => {
        dispatch(request());

        userService.verify(token)
            .then(
                response => { 
                    dispatch(success(response));
					history.replace('/login');
					dispatch(alertActions.success(response.message));
                },
                error => {
                    dispatch(failure(error));
				}
            );
    };

    function request() { return { type: userConstants.VERIFY_REQUEST } }
    function success(response) { return { type: userConstants.VERIFY_SUCCESS, response } }
    function failure(error) { return { type: userConstants.VERIFY_FAILURE, error } }
}