import {
  call, put, all, select, takeLatest, delay,
} from 'redux-saga/effects';
import EventsAPI from '../../api/events';
import {
  getEventsError,
  getEventsFinish,
  getEventsStart,
  getEvents, setMaxPrice, setLimit, setPage, setMinPrice, setSearchQuery, resetFilters,
} from '../events/actions';
import { getFiltersSelector } from '../events/selectors';

export const SEARCH_EVENTS_DEBOUNCE_DELAY = 500; // ms

export function* searchEvents() {
  yield put(getEventsStart());
  yield delay(SEARCH_EVENTS_DEBOUNCE_DELAY);
  const filters = yield select(getFiltersSelector);

  try {
    const data = yield call(EventsAPI.getAll, filters);
    yield put(getEventsFinish(data));
  } catch (e) {
    yield getEventsError(e.payload || { details: e.message });
  }
}

function* watchChangeFilters() {
  yield takeLatest([
    getEvents,
    setMaxPrice,
    setLimit,
    setPage,
    setMinPrice,
    setSearchQuery,
    resetFilters,
  ], searchEvents);
}

export default function* eventsFlow() {
  yield all([
    watchChangeFilters(),
  ]);
}
