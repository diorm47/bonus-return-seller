const mainApiOptions = {
  baseUrl: "https://api-seller.bonusreturn.ru/api/v1",

  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponseStatus(response) {
    return response.ok
      ? response.json()
      : response.json().then((err) => Promise.reject(err));
  }
  async _sendRequest({
    endpoint,
    method = "GET",
    body,
    requiresToken = false,
  }) {
    const headers = { ...this._headers };

    if (requiresToken) {
      const token = localStorage.getItem("token");
      if (!token) {
        return Promise.reject("No token found in localStorage");
      }
      headers["Api-Key"] = token;
    }

    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    return this._checkResponseStatus(res);
  }

  // Sign actions list
  async authorizationAction(userData) {
    return this._sendRequest({
      endpoint: `/seller/registration/`,
      method: "POST",
      body: userData,
    });
  }
  async loginAction(userData) {
    return this._sendRequest({
      endpoint: `/seller/login/`,
      method: "POST",
      body: userData,
    });
  }
  async updateToken(userData) {
    return this._sendRequest({
      endpoint: `/seller/refresh-access-token/`,
      method: "POST",
      body: userData,
    });
  }

  // platforms
  async getPlatforms() {
    return this._sendRequest({
      endpoint: `/personal_area/get-platforms/`,
      method: "POST",
    });
  }

  // check token
  async postToken(data) {
    return this._sendRequest({
      endpoint: `/personal_area/wb-api-statistics-token/check-n-save`,
      method: "POST",
      requiresToken: true,
      body: data,
    });
  }

  // products & products actions
  async getProducts() {
    return this._sendRequest({
      endpoint: `/personal_area/get-applies-table/`,
      method: "GET",
      requiresToken: true,
    });
  }
  async confrimFeedback(data) {
    return this._sendRequest({
      endpoint: `/personal_area/confirm-apply/`,
      method: "POST",
      requiresToken: true,
      body: data,
    });
  }
  async rejectFeedback(data) {
    return this._sendRequest({
      endpoint: `/personal_area/reject-apply/`,
      method: "POST",
      requiresToken: true,
      body: data,
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
