import { challengesConstants } from '../_constants';
import { challengesService } from '../_services';

export const userEventsActions = {
	getAll,
	create,
	delete: _delete,
	edit,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        challengesService.getAll()
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: challengesConstants.GETALL_REQUEST } }
    function success(response) { return { type: challengesConstants.GETALL_SUCCESS, response } }
    function failure(error) { return { type: challengesConstants.GETALL_FAILURE, error } }
}

function create(challengeOptions) {
    return dispatch => {
        dispatch(request());

        challengesService.create(challengeOptions)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: challengesConstants.CREATE_REQUEST } }
    function success(response) { return { type: challengesConstants.CREATE_SUCCESS, response } }
    function failure(error) { return { type: challengesConstants.CREATE_FAILURE, error } }
}

function _delete(challengeId) {
    return dispatch => {
        dispatch(request());

        challengesService.delete(challengeId)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: challengesConstants.DELETE_REQUEST } }
    function success(response) { return { type: challengesConstants.DELETE_SUCCESS, response } }
    function failure(error) { return { type: challengesConstants.DELETE_FAILURE, error } }
}

function edit(challengeId, challengeOptions) {
    return dispatch => {
        dispatch(request());

        challengesService.edit(challengeId, challengeOptions)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: challengesConstants.EDIT_REQUEST } }
    function success(response) { return { type: challengesConstants.EDIT_SUCCESS, response } }
    function failure(error) { return { type: challengesConstants.EDIT_FAILURE, error } }
}