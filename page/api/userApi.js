const baseURL = 'https://reqres.in';

class UserApi {
  constructor(request) {
    this.request = request;
  }

  async createUser(data) {
    return this.request.post(`${baseURL}/api/users`, {
      data
    });
  }

  async getUser(userId) {
    return this.request.get(`${baseURL}/api/users/${userId}`);
  }

  async updateUser(userId, data) {
    return this.request.put(`${baseURL}/api/users/${userId}`, {
      data
    });
  }

  async deleteUser(userId) {
    return this.request.delete(`${baseURL}/api/users/${userId}`);
  }
}

module.exports = UserApi;
