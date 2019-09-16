import { createAction } from 'redux-actions';

// eslint-disable-next-line import/prefer-default-export
export const startSignIn = createAction('AUTH/SIGN_IN_START');
export const startSignUp = createAction('AUTH/SIGN_UP_START');
export const errorSignIn = createAction('AUTH/SIGN_IN_ERROR');
export const finishSignIn = createAction('AUTH/SIGN_IN_FINISH', (token) => ({ token }));
export const reset = createAction('AUTH/RESET');
