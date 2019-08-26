import {
  action, observable, reaction, when, autorun,
} from 'mobx';
import EventsAPI from '../../api/events';

class EventStore {
  @observable inProgress;

  @observable errors;

  @observable events;

  @observable options = {};

  @action setPage = (newPage) => this.options.currentPage = parseInt(newPage.selected, 10);

  @action setLimit = (newLimit) => this.options.limit = parseInt(newLimit, 10);

  @action setSearchQuery = (query) => this.options.searchQuery = query;

  constructor(rootStore) {
    this.rootStore = rootStore;
    reaction(() => Object.values(this.options), this.getEvents);
    this.reset();
  }

  @action
  setErrors = (error) => this.errors = error.payload || error;

  @action
  clearErrors = () => this.errors = {};

  @action
  getEvents = async () => {
    this.inProgress = true;
    this.clearErrors();
    try {
      const response = await EventsAPI.getAll(
        this.options.limit,
        this.options.currentPage * this.options.limit,
        this.options.searchQuery,
      );

      this.events = response.results;
      this.options.total = response.count;
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  };

  // we need this method to reset event view
  @action
  reset = () => {
    this.options = {
      limit: 5,
      currentPage: 0,
      searchQuery: undefined,
    };
    this.errors = {};
    this.events = [];
    this.inProgress = false;
    this.clearErrors();
  }
}

export default EventStore;
