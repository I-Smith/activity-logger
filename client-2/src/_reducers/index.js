import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { userEvents } from './user-events.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  userEvents,
  users,
  alert
});

export default rootReducer;