import { createAction } from 'redux-actions';

export const startSignIn = createAction('AUTH/SIGN_IN_START');
export const startSignUp = createAction('AUTH/SIGN_UP_START');
export const errorSignIn = createAction('AUTH/SIGN_IN_ERROR');
export const finishSignIn = createAction('AUTH/SIGN_IN_FINISH', (token, email) => ({ token, email }));
export const reset = createAction('AUTH/RESET');
