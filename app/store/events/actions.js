import { createAction, createActions } from 'redux-actions';

export const resetFilters = createAction('EVENTS__FILTERS__RESET');
export const setPage = createAction('EVENTS__FILTERS__SET_PAGE');
export const setMinPrice = createAction('EVENTS__FILTERS__SET_MIN_PRICE');
export const setMaxPrice = createAction('EVENTS__FILTERS__SET_MAX_PRICE');
export const setSearchQuery = createAction('EVENTS__FILTERS__SET_SEARCH_QUERY');
export const setLimit = createAction('EVENTS__FILTERS__SET_LIMIT');
export const getEvents = createAction('EVENTS__LOADING');
export const getEventsStart = createAction('EVENTS__LOADING_START');
export const getEventsFinish = createAction('EVENTS__LOADING_FINISH', (data) => ({
  events: data.results,
  totalEvents: data.count,
}));
export const getEventsError = createAction('EVENTS__LOADING_ERROR');

