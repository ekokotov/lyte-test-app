import { action, observable } from 'mobx';
import AuthTokenService from '../../utils/token-service';
import AuthAPI from '../../api/auth';

class AuthStore {
    @observable inProgress = false;

    @observable errors = {};

    @observable token = AuthTokenService.getToken();

    constructor(rootStore) {
      this.rootStore = rootStore;
    }

    @action
    setErrors = (error) => this.errors = error.payload || error;

    @action
    clearErrors = () => this.errors = {};

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
        return this.signIn({email, password});
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
        return resp.token;
      } catch (err) {
        this.setErrors(err);
      } finally {
        this.inProgress = false;
      }
    };
}

export default AuthStore;
