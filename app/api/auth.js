import APIRequest from './request';

class AuthAPI {
    register = (email, password) => APIRequest.request(process.env.API_USER_SIGNUP_PATH, 'POST', { email, password });

    login = (username, password) => APIRequest.request(process.env.API_USER_SIGNIN_PATH, 'POST', { username, password });
}


export default new AuthAPI();
