import AuthStore from './auth';
import EventStore from './events';

class RootStore {
  constructor() {
    this.AuthStore = new AuthStore(this);
    this.EventStore = new EventStore(this);
  }
}

const stores = new RootStore();

if (!process.env.IS_PRODUCTION) {
// For easier debugging
  window.__stores__ = stores;
}

export default stores;
