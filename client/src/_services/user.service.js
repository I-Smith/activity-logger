import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const userService = {
	getAll,
	edit,
	forgotPassword,
    login,
	logout,
	register,
	resetPassword,
	verify,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function edit(userId, userOptions) {
	const requestOptions = {
        method: 'PUT',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userOptions),
	};
	// const userId = localStorage.getItem('user').id;

    return fetch(`${config.apiUrl}/users/${userId}`, requestOptions).then(handleResponse);
}

function forgotPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(`${config.apiUrl}/users/forgot-password`, requestOptions)
        .then(handleResponse);
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(registerOptions) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerOptions)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions)
        .then(handleResponse);
}

function resetPassword(resetPasswordOptions) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetPasswordOptions)
    };

    return fetch(`${config.apiUrl}/users/reset-password`, requestOptions)
		.then(handleResponse);
}

function verify(token) {
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
	};
	
	return fetch(`${config.apiUrl}/users/verify-email`, requestOptions)
		.then(handleResponse);
}