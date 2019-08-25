import { action, observable } from 'mobx';
import AuthTokenService from '../../utils/token-service';
import AuthAPI from '../../api/auth';

class AuthStore {
    @observable inProgress = false;

    @observable errors = {};

    @observable token = AuthTokenService.getToken();

    @action
    setProgress = (val) => this.inProgress = val;

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
      this.token = null;
      AuthTokenService.resetToken();
    };

    // just register user by credentials and call login immediately to get session token
    // (cuz register doesn't returns users token)
    @action
    signUp = async (email, password) => {
      this.setProgress(true);
      this.clearErrors();
      try {
        await AuthAPI.register(email, password);
        return this.signIn(email, password);
      } catch (err) {
        this.setErrors(err);
      } finally {
        this.setProgress(false);
      }
    };

    @action
    signIn = async (email, password) => {
      this.setProgress(true);
      this.clearErrors();
      try {
        const resp = await AuthAPI.login(email, password);
        this.setAuth(resp.token);
        return resp.token;
      } catch (err) {
        this.setErrors(err);
      } finally {
        this.setProgress(false);
      }
    };
}

export default new AuthStore();
