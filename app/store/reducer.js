import { combineReducers } from 'redux';
import auth from './auth/reducer';
import events from './events/reducer';

export default combineReducers({
  auth,
  events,
});
