import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'Admin')
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)} />
)