import {action, entries, observable, reaction} from 'mobx';
import throttle from 'lodash/throttle';
import EventsAPI from '../../api/events';
import {
  DEFAULT_EVENT_FILTER_VALUES,
  SEARCH_EVENTS_TROTTLE_DELAY,
} from './const';

class EventStore {
  totalEvents = 0;

  @observable inProgress;

  @observable errors;

  @observable events = [];

  @observable selectedEvent;

  @observable filters = DEFAULT_EVENT_FILTER_VALUES;

  @action setPage = (newPage) => this.filters.currentPage = parseInt(newPage.selected, 10);

  @action setLimit = (newLimit) => this.filters.limit = parseInt(newLimit, 10);

  @action setSearchQuery = (query) => this.filters.searchQuery = query;

  @action setMinPrice = (price) => this.filters.minPrice = price;

  @action setMaxPrice = (price) => this.filters.maxPrice = price;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.reset();
    // to send request on any filter change with throttling
    reaction(() => entries(this.filters), this.getEvents);
    // or -> deepObserve(this.filters, this.getEvents);
  }

  @action
  setErrors = (error) => this.errors = error.payload || error;

  @action
  clearErrors = () => this.errors = null;

  @action
  getEvents = throttle(async () => {
    this.inProgress = true;
    this.clearErrors();
    try {
      const response = await EventsAPI.getAll(this.filters);

      this.events = response.results;
      this.totalEvents = response.count;
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  }, SEARCH_EVENTS_TROTTLE_DELAY);

  @action
  getById = async (eventId) => {
    this.inProgress = true;
    this.clearErrors();
    try {
      this.selectedEvent = await EventsAPI.getById(eventId);
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  };

  // we need this method to reset event filters view
  @action
  reset = () => {
    Object.assign(this.filters, DEFAULT_EVENT_FILTER_VALUES);
    this.errors = null;
    this.inProgress = false;
  }
}

export default EventStore;
