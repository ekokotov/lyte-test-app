import APIRequest from './request';

class AuthAPI {
    REGISTER_PATH = 'users/register';

    LOGIN_PATH = 'users/token/';

    register = (email, password) => APIRequest.request(this.REGISTER_PATH, 'POST', { email, password });

    login = (username, password) => APIRequest.request(this.LOGIN_PATH, 'POST', { username, password });
}


export default new AuthAPI();
