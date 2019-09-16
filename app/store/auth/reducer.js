import { combineActions, handleActions } from 'redux-actions';
import AuthTokenService from '../../utils/token-service';
import {
  errorSignIn,
  finishSignIn, reset, startSignIn, startSignUp,
} from './actions';

const initialState = {
  token: AuthTokenService.getToken(),
  email: undefined,
  errors: undefined,
  inProgress: false,
};

export default handleActions({
  [reset]: (state) => ({ ...initialState, token: state.token, email: state.email }),
  [combineActions(startSignIn, startSignUp)]: (state) => ({
    ...state, inProgress: true, errors: undefined,
  }),
  [finishSignIn]: (state, { payload }) => ({
    ...state, inProgress: false, errors: undefined, ...payload,
  }),
  [errorSignIn]: (state, { payload }) => ({ ...state, inProgress: false, errors: payload }),
}, initialState);
