import {
  action, observable, reaction, when,
} from 'mobx';
import EventsAPI from '../../api/events';

class EventStore {
    @observable inProgress = false;

    @observable errors = {};

    @observable events = [];

    @observable limit = 10;

    @observable total;

    @observable offset = 0;

    @action setLimit = (newLimit) => this.limit = parseInt(newLimit, 10);

    @action setOffset = (newOffset) => this.offset = parseInt(newOffset, 10);

    constructor(rootStore) {
      this.rootStore = rootStore;
      reaction(
        () => this.rootStore.AuthStore.token,
        this.getEvents,
        { fireImmediately: true },
      );
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
        const response = await EventsAPI.getAll(this.limit, this.offset);
        this.events = response.results;
        this.total = response.count;
      } catch (err) {
        this.setErrors(err);
      } finally {
        this.inProgress = false;
      }
    };
}

export default EventStore;
