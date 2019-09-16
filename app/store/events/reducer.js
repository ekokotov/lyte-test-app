import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  getEventsError,
  getEventsFinish,
  getEventsStart,
  resetFilters, setSearchQuery, setMaxPrice, setMinPrice, setLimit, setPage,
} from './actions';

const DEFAULT_EVENT_FILTER_VALUES = {
  limit: 5,
  currentPage: 0,
  searchQuery: '',
  minPrice: '', // to keep inputs empty
  maxPrice: '', // to keep inputs empty
};

const initialState = {
  totalEvents: 0,
  events: [],
  filters: DEFAULT_EVENT_FILTER_VALUES,
  inProgress: false,
  errors: undefined,
};
export default handleActions({
  [getEventsStart]: (state) => produce(state, (draft) => {
    draft.inProgress = true;
  }),
  [getEventsFinish]: (state, { payload }) => produce(state, (draft) => {
    draft.events = payload.events;
    draft.totalEvents = payload.totalEvents;
    draft.inProgress = false;
    draft.errors = undefined;
  }),
  [getEventsError]: (state, { payload }) => produce(state, (draft) => {
    draft.inProgress = false;
    draft.errors = payload;
  }),
  [setPage]: (state, { payload }) => produce(state, (draft) => {
    draft.filters.currentPage = payload.selected;
  }),
  [setLimit]: (state, { payload }) => produce(state, (draft) => {
    draft.filters.limit = payload;
  }),
  [setMinPrice]: (state, { payload }) => produce(state, (draft) => {
    draft.filters.minPrice = payload;
  }),
  [setMaxPrice]: (state, { payload }) => produce(state, (draft) => {
    draft.filters.maxPrice = payload;
  }),
  [setSearchQuery]: (state, { payload }) => produce(state, (draft) => {
    draft.filters.searchQuery = payload;
  }),
  [resetFilters]: (state) => produce(state, (draft) => {
    draft.filters = DEFAULT_EVENT_FILTER_VALUES;
    draft.filters.currentPage = state.currentPage;
  }),
}, initialState);
