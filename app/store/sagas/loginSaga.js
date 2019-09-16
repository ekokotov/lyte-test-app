import {
  take, call, put, all,
} from 'redux-saga/effects';
import AuthAPI from '../../api/auth';
import AuthTokenService from '../../utils/token-service';
import { errorSignIn, finishSignIn, startSignIn } from '../auth/actions';

function* errorAuth(error) {
  console.error(error);
  if (error.payload) {
    yield put(errorSignIn(error.payload));
  }
}

export function* loginFlow() {
  while (true) {
    const { payload: { email, password } } = yield take('AUTH/SIGN_IN_START');
    try {
      const data = yield call(AuthAPI.login, email, password);

      if (data.token) {
        yield call(AuthTokenService.saveToken, data.token);
        yield put(finishSignIn(data.token, email));
        yield take(['AUTH/LOGOUT', 'AUTH/SIGN_IN_ERROR']);
        yield call(AuthTokenService.resetToken);
      }
    } catch (e) {
      yield errorAuth(e);
    }
  }
}

export function* registerFlow() {
  while (true) {
    const { payload: { email, password } } = yield take('AUTH/SIGN_UP_START');
    try {
      yield call(AuthAPI.register, email, password);
      yield put(startSignIn({ email, password }));
    } catch (e) {
      yield errorAuth(e);
    }
  }
}

export default function* authFlow() {
  yield all([
    loginFlow(),
    registerFlow(),
  ]);
}
