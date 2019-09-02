class APIRequest {
  constructor(ApiUrl) {
    this.ApiUrl = ApiUrl;
  }

  async request(path, method, data, options = {}) {
    const url = new URL(`${this.ApiUrl}/${path}`);
    const params = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.authToken && { Authorization: `Token ${options.authToken}` },
      },
      // mode: 'cors',
    };

    if (['POST', 'PATCH'].includes(method.toUpperCase())) {
      params.body = JSON.stringify(data);
    } else if (method.toUpperCase() === 'GET' && data) {
      url.search = new URLSearchParams(data);
    }
    const request = new Request(url, params);
    const response = await fetch(request);
    const payload = await response.json();

    if (response.ok) {
      return payload;
    }
    this.throwErrorFromPayload(payload);
  }

  throwErrorFromPayload = (payload) => {
    const error = new Error('Internal Error');
    error.payload = payload;
    /* Response error should follow such format:
      {email|password|non_field_errors: ["error description", ...]} */
    throw error;
  }
}

export default new APIRequest(process.env.API_BASE_URL);
