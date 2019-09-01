import {
  action, entries, observable, reaction, computed,
} from 'mobx';
import debounce from 'lodash/debounce';
import EventsAPI from '../../api/events';
import {
  DEFAULT_EVENT_FILTER_VALUES,
  SEARCH_EVENTS_DEBOUNCE_DELAY,
} from './const';

class EventStore {
  totalEvents = 0;

  @observable inProgress = true;

  @observable errors = {};

  @observable events = [];

  @observable selectedEvent;

  @observable filters = DEFAULT_EVENT_FILTER_VALUES;

  @observable currentPage = 0;

  @action setPage = (newPage) => this.currentPage = parseInt(newPage.selected, 10);

  @action setLimit = (newLimit) => this.filters.limit = parseInt(newLimit, 10);

  @action setSearchQuery = (query) => this.filters.searchQuery = query;

  @action setMinPrice = (price) => this.filters.minPrice = price;

  @action setMaxPrice = (price) => this.filters.maxPrice = price;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.reset();
    // to send request on any filter change with throttling
    // or -> deepObserve(this.filters, this.getEvents);
    reaction(() => entries(this.filters), () => {
      this.currentPage = 0;
      this.getEvents();
    });
    reaction(() => this.currentPage, this.getEvents);
  }

  @action
  setErrors = (error) => this.errors = error.payload || error;

  @action
  clearErrors = () => this.errors = {};

  @computed get hasGlobalError() {
    return Boolean(this.errors && this.errors instanceof Error);
  }

  @action
  updateSelectedEvent = (prop, value) => this.selectedEvent[prop] = value;

  @action
  getEvents = debounce(async () => {
    this.inProgress = true;
    this.clearErrors();
    try {
      const response = await EventsAPI.getAll({ ...this.filters, currentPage: this.currentPage });

      this.events = response.results;
      this.totalEvents = response.count;
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  }, SEARCH_EVENTS_DEBOUNCE_DELAY);

  @action
  getById = async (eventId) => {
    this.inProgress = true;
    this.clearErrors();
    try {
      this.selectedEvent = await EventsAPI.getById(eventId);
      return this.selectedEvent;
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  };

  @action
  updateEvent = async (eventId, data) => {
    this.inProgress = true;
    this.clearErrors();
    try {
      return await EventsAPI.update(eventId, data, { authToken: this.rootStore.AuthStore.token });
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
    this.clearErrors();
  };
}

export default EventStore;
