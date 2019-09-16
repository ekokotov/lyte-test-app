import { combineActions, handleActions } from 'redux-actions';
import produce from 'immer';
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
  [reset]: (state) => produce(initialState, (draft) => {
    draft.token = state.token;
    draft.email = state.email;
  }),
  [combineActions(startSignIn, startSignUp)]: (state) => produce(state, (draft) => {
    draft.inProgress = true;
    draft.errors = undefined;
  }),
  [finishSignIn]: (state, { payload }) => produce(state, (draft) => {
    draft.inProgress = false;
    draft.email = payload.email;
    draft.token = payload.token;
  }),
  [errorSignIn]: (state, { payload }) => produce(state, (draft) => {
    draft.inProgress = false;
    draft.errors = payload;
  }),
}, initialState);
