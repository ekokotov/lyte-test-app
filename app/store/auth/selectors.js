import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const hasAuthErrors = createSelector(
  (store) => store.auth.errors,
  (errors) => Boolean(errors && Object.keys(errors).length),
);
