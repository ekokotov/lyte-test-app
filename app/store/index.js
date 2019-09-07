import AuthStore from './auth';
import EventStore from './events';
import RouterStore from './router';

class RootStore {
  constructor() {
    this.AuthStore = new AuthStore(this);
    this.EventStore = new EventStore(this);
    this.router = new RouterStore(this);
  }
}

const stores = new RootStore();

if (!process.env.IS_PRODUCTION) {
// For easier debugging
  window.__stores__ = stores;
}

export default stores;
