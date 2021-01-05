import { userEventsConstants } from '../_constants';
import { userEventsService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userEventsActions = {
	getAll,
	create,
	delete: _delete,
	edit,
};

function getAll(userId) {
    return dispatch => {
        dispatch(request());

        userEventsService.getAll(userId)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userEventsConstants.GETALL_REQUEST } }
    function success(response) { return { type: userEventsConstants.GETALL_SUCCESS, response } }
    function failure(error) { return { type: userEventsConstants.GETALL_FAILURE, error } }
}

function create(userId, eventOptions) {
    return dispatch => {
        dispatch(request());

        userEventsService.create(userId, eventOptions)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userEventsConstants.CREATE_REQUEST } }
    function success(response) { return { type: userEventsConstants.CREATE_SUCCESS, response } }
    function failure(error) { return { type: userEventsConstants.CREATE_FAILURE, error } }
}

function _delete(userId, eventId) {
    return dispatch => {
        dispatch(request());

        userEventsService.delete(userId, eventId)
            .then(
                response => dispatch(success({ ...response, eventId })),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userEventsConstants.DELETE_REQUEST } }
    function success(response) { return { type: userEventsConstants.DELETE_SUCCESS, response } }
    function failure(error) { return { type: userEventsConstants.DELETE_FAILURE, error } }
}

function edit(userId, eventId, eventOptions) {
    return dispatch => {
        dispatch(request());

        userEventsService.edit(userId, eventId, eventOptions)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userEventsConstants.EDIT_REQUEST } }
    function success(response) { return { type: userEventsConstants.EDIT_SUCCESS, response } }
    function failure(error) { return { type: userEventsConstants.EDIT_FAILURE, error } }
}