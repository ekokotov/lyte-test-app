import { spawn } from 'redux-saga/effects';
import authFlow from './sagas/loginSaga';

export default function* rootSaga() {
  yield spawn(authFlow);
}
