import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './auth/authentication.reducer';
import { forgotPassword } from './auth/forgotPassword.reducer';
import { registration } from './auth/registation.reducer';
import { resetPassword } from './auth/resetPassword.reducer';
import { verification } from './auth/verification.reducer';
import { challenges } from './challenges.reducer';
import { report } from './report.reducer';
import { userEvents } from './user-events.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
	alert,
	authentication,
	challenges,
	forgotPassword,
	registration,
	report,
	resetPassword,
	userEvents,
	users,
	verification,
});

export default rootReducer;