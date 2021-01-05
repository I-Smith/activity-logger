import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const challengesService = {
	getAll,
	create,
	delete: _delete,
	edit,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
	};
    return fetch(`${config.apiUrl}/challenges/`, requestOptions).then(handleResponse);
}

function create(challengeOptions) {
	const requestOptions = {
        method: 'POST',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(challengeOptions),
	};

    return fetch(`${config.apiUrl}/challenges`, requestOptions).then(handleResponse);
}

function _delete(challengeId) {
	const requestOptions = {
        method: 'DELETE',
		headers: authHeader(),
	};

    return fetch(`${config.apiUrl}/challenges/${challengeId}`, requestOptions).then(handleResponse);
}

function edit(challengeId, challengeOptions) {
	const requestOptions = {
        method: 'PUT',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(challengeOptions),
	};

    return fetch(`${config.apiUrl}/challenges/${challengeId}`, requestOptions).then(handleResponse);
}