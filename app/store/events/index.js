import {
  action, observable, reaction, entries,
} from 'mobx';
import throttle from 'lodash/throttle';
import EventsAPI from '../../api/events';
import { DEFAULT_EVENT_FILTER_VALUES, SEARCH_EVENTS_TROTTLE } from './const';

class EventStore {
  totalEvents = 0;

  @observable inProgress;

  @observable errors;

  @observable events = [];

  @observable options = DEFAULT_EVENT_FILTER_VALUES;

  @action setPage = (newPage) => this.options.currentPage = parseInt(newPage.selected, 10);

  @action setLimit = (newLimit) => Object.assign(this.options, { limit: parseInt(newLimit, 10) });

  @action setSearchQuery = (query) => this.options.searchQuery = query;

  @action setMinPrice = (price) => this.options.minPrice = parseFloat(price) || 0;

  @action setMaxPrice = (price) => this.options.maxPrice = parseFloat(price) || 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.reset();
    // to send request on any filter change with throttling
    reaction(() => entries(this.options), this.getEvents);
    // or -> deepObserve(this.options, this.getEvents);
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
      const response = await EventsAPI.getAll(
        this.options.limit,
        this.options.currentPage * this.options.limit,
        this.options.searchQuery,
        this.options.minPrice,
        this.options.maxPrice,
      );

      this.events = response.results;
      this.totalEvents = response.count;
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  }, SEARCH_EVENTS_TROTTLE);

  // we need this method to reset event filters view
  @action
  reset = () => {
    Object.assign(this.options, DEFAULT_EVENT_FILTER_VALUES);
    this.errors = null;
    this.inProgress = false;
  }
}

export default EventStore;
