import { combineReducers } from 'redux';
import eventReducer from './event/eventReducers';

export default combineReducers({
	eventStore: eventReducer,
});