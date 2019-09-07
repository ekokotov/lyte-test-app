import { RouterStore as MobxRouterStore } from 'mobx-router';

class RouterStore extends MobxRouterStore {
  constructor(rootStore) {
    super();
    this.go = (route, params) => this.goTo(route, params, rootStore);
  }
}

export default RouterStore;
