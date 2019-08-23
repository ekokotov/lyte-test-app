import { action, observable } from 'mobx';
// import AuthService from '../../services/auth';

class AuthStore {
  constructor() {
    // const userIdentity = AuthService.getToken();
    // if (userIdentity) this.setAuth(userIdentity);
  }

    @observable inProgress = false;

    @observable errors;

    token;

    @observable user;

    @action toggleProgress = () => this.inProgress = !this.inProgress;

    @action setErrors = (err) => {
      this.errors = err;
      if (err) throw err;
    };

    @action
    setAuth = ({ user, token }) => {
      this.user = user;
      this.token = token;
      AuthService.saveToken(token);
    };

    @action resetUser() {
      this.user = null;
      this.token = null;
    }

    signUp = (userData) => this._authRequest(AuthService.signup, userData);

    login = (userData) => this._authRequest(AuthService.login, userData);

    _authRequest(method, userData) {
      this.toggleProgress();
      this.setErrors(null);

      return method(userData)
        .then(this.setAuth)
        .catch(this.setErrors)
        .finally(this.toggleProgress);
    }

    logout() {
      this.resetUser();
      AuthService.removeToken();
    }
}

export default new AuthStore();
