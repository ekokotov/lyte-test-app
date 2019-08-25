const AUTH_TOKEN_NAME = 'lyte-auth-token';

class AuthTokenService {
    resetToken = () => localStorage.removeItem(AUTH_TOKEN_NAME);

    saveToken = (connectionToken) => localStorage.setItem(AUTH_TOKEN_NAME, connectionToken);

    getToken = () => localStorage.getItem(AUTH_TOKEN_NAME);
}

export default new AuthTokenService();
