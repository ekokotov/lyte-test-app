class APIRequest {
  constructor(ApiUrl) {
    this.ApiUrl = ApiUrl;
    this.session = null;
  }

  async request(path, method, data, auth = false) {
    const request = new Request(`${this.ApiUrl}/${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...auth && { Authorization: `Token ${this.session}` },
      },
      mode: 'cors',
    });

    const response = await fetch(request);
    const payload = await response.json();

    if (response.ok) {
      return payload;
    }
    this.throwErrorFromPayload(payload);
  }

  throwErrorFromPayload(payload) {
    const error = new Error('Internal Error');
    error.payload = payload;
    /* Response error should follow such format:
      {email|password|non_field_errors: ["error description", ...]} */
    throw error;
  }
}

export default new APIRequest(process.env.SWAGGER_API_URL);
