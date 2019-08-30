class APIRequest {
  constructor(ApiUrl) {
    this.ApiUrl = ApiUrl;
    this.session = null;
  }

  async request(path, method, data, auth = false) {
    const url = new URL(`${this.ApiUrl}/${path}`);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...auth && { Authorization: `Token ${this.session}` },
      },
      mode: 'cors',
    };

    if (method.toUpperCase() === 'POST') {
      options.body = JSON.stringify(data);
    } else if (method.toUpperCase() === 'GET' && data) {
      url.search = new URLSearchParams(data);
    }
    const request = new Request(url, options);
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
