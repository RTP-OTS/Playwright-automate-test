const baseURL = 'https://reqres.in';

class LoginApi {
  constructor(request) {
    this.request = request;
  }

  async loginWithValidData(email, password) {
    return this.request.post(`${baseURL}/api/login`, {
      data: { email, password }
    });
  }

  async loginWithMissingEmail(password) {
    return this.request.post(`${baseURL}/api/login`, {
      data: { password }
    });
  }

  async loginWithMissingPassword(email) {
    return this.request.post(`${baseURL}/api/login`, {
      data: { email }
    });
  }

  async loginWithInvalidPassword(email, password) {
    return this.request.post(`${baseURL}/api/login`, {
      data: { email, password }
    });
  }
}

module.exports = LoginApi;
