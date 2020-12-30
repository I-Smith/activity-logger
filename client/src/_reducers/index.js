import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { forgotPassword } from './forgotPassword.reducer';
import { registration } from './registation.reducer';
import { resetPassword } from './resetPassword.reducer';
import { userEvents } from './user-events.reducer';
import { users } from './users.reducer';
import { verification } from './verification.reducer';

const rootReducer = combineReducers({
	alert,
	authentication,
	forgotPassword,
	registration,
	resetPassword,
	userEvents,
	users,
	verification,
});

export default rootReducer;