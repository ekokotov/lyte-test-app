import { createSelector } from 'reselect';

export const hasEventsErrors = createSelector(
  (store) => store.events.errors,
  (errors) => Boolean(errors && Object.keys(errors).length),
);
export const getFiltersSelector = (store) => store.events.filters;
