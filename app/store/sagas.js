import { spawn } from 'redux-saga/effects';
import authFlow from './sagas/loginSaga';
import eventsFlow from './sagas/eventsSaga';

export default function* rootSaga() {
  yield spawn(authFlow);
  yield spawn(eventsFlow);
}
