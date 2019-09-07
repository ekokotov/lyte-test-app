import { action, computed, observable } from 'mobx';
import AuthTokenService from '../../utils/token-service';
import AuthAPI from '../../api/auth';
import Routes from '../../routes';

class AuthStore {
  @observable inProgress = false;

  @observable errors;

  @observable token = AuthTokenService.getToken();

  @computed get hasErrors() {
    return Boolean(this.errors && Object.keys(this.errors).length);
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  redirectToLogin = () => this.rootStore.router.go(Routes.signIn);

  @action
  setErrors = (error) => (this.errors = error.payload || { details: error.message });

  @action
  clearErrors = () => (this.errors = null);

  @action
  setAuth = (token) => {
    if (!token) {
      return console.warn('!No authentication token to save...');
    }
    this.token = token;
    AuthTokenService.saveToken(token);
  };

  @action logout = () => {
    AuthTokenService.resetToken();
    this.token = null;
  };

  // just register user by credentials and call login immediately to get session token
  // (cuz register doesn't returns users token)
  @action
  signUp = async ({ email, password }) => {
    this.inProgress = true;
    this.clearErrors();
    try {
      await AuthAPI.register(email, password);
      await this.signIn({ email, password });
      this.rootStore.router.go(Routes.home);
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  };

  @action
  signIn = async ({ email, password }) => {
    this.inProgress = true;
    this.clearErrors();
    try {
      const resp = await AuthAPI.login(email, password);
      this.setAuth(resp.token);
      this.rootStore.router.go(Routes.home);
    } catch (err) {
      this.setErrors(err);
    } finally {
      this.inProgress = false;
    }
  };
}

export default AuthStore;
