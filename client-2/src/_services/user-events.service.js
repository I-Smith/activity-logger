import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const userEventsService = {
	getAll,
	create,
	delete: _delete,
	edit,
};

function getAll(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
	};
	console.log(`*****************FETCHING log events for USER ${userId}`)
    return fetch(`${config.apiUrl}/users/${userId}/log-events`, requestOptions).then(handleResponse);
}

function create(userId, eventOptions) {
	const requestOptions = {
        method: 'POST',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(eventOptions),
	};

    return fetch(`${config.apiUrl}/users/${userId}/log-events`, requestOptions).then(handleResponse);
}

function _delete(userId, eventId) {
	const requestOptions = {
        method: 'DELETE',
		headers: authHeader(),
	};

    return fetch(`${config.apiUrl}/users/${userId}/log-events/${eventId}`, requestOptions).then(handleResponse);
}

function edit(userId, eventId, eventOptions) {
	const requestOptions = {
        method: 'PUT',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(eventOptions),
	};
	// const userId = localStorage.getItem('user').id;

    return fetch(`${config.apiUrl}/users/${userId}/log-events/${eventId}`, requestOptions).then(handleResponse);
}