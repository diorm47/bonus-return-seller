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

  // //////////////////////////////////////////////////////////////////////////////
  async tgLogin(userData) {
    return this._sendRequest({
      endpoint: `/client/telegram-auth/`,
      method: "POST",
      body: userData,
    });
  }
  async getCPILinks() {
    return this._sendRequest({
      endpoint: `/website/get-cpi-web-site-located-links/`,
      method: "GET",
    });
  }
  async getCPILinksPage(type) {
    return this._sendRequest({
      endpoint: `/website/get-cpi-links/?bonus_promo_type=${type}`,
      method: "GET",
    });
  }
  async getTopTen() {
    return this._sendRequest({
      endpoint: `/website/get-top-10-high-cashback-in-platforms/`,
      method: "GET",
    });
  }
  async applyFeddCash(userData) {
    return this._sendRequest({
      endpoint: `/website/apply-for-feedback-cashback/`,
      method: "POST",
      body: userData,
      requiresToken: true,
    });
  }
  async applyPromo(userData) {
    return this._sendRequest({
      endpoint: `/website/apply-for-promo_code-cashback/`,
      method: "POST",
      body: userData,
      requiresToken: true,
    });
  }
  async applySellerCon(userData) {
    return this._sendRequest({
      endpoint: `/website/apply-for-seller-connection/`,
      method: "POST",
      body: userData,
      requiresToken: true,
    });
  }
  async homeSearch(userData) {
    return this._sendRequest({
      endpoint: `/website/search/?q=${userData}`,
      method: "GET",

      requiresToken: true,
    });
  }
  async getPlatforms() {
    return this._sendRequest({
      endpoint: `/website/get-platforms/`,
      method: "GET",
    });
  }
  async getCategories() {
    return this._sendRequest({
      endpoint: `/website/get-cpi-categories/`,
      method: "GET",
    });
  }
  async applyConsulting(userData) {
    return this._sendRequest({
      endpoint: `/website/sellers/apply-for-consulting/`,
      method: "POST",
      body: userData,
      requiresToken: true,
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
