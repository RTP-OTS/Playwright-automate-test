const baseURL = 'https://reqres.in';

class RegisterApi {
  constructor(request) {
    this.request = request;
  }

  async registerWithValidData(email, password) {
    return this.request.post(`${baseURL}/api/register`, {
      data: { email, password }
    });
  }

  async registerWithMissingEmail(password) {
    return this.request.post(`${baseURL}/api/register`, {
      data: { password }
    });
  }

  async registerWithMissingPassword(email) {
    return this.request.post(`${baseURL}/api/register`, {
      data: { email }
    });
  }

  async registerWithInvalidEmailFormat(email, password) {
    return this.request.post(`${baseURL}/api/register`, {
      data: { email, password }
    });
  }
}

module.exports = RegisterApi;
