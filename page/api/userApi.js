class UserAPI {
    constructor(request) {
        this.request = request;
    }

    async createUser(username, password, email) {
        const response = await this.request.post('/api/users', {
            data: { username, password, email },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(201);
        return await response.json();
    }

    async loginUser(username, password) {
        const response = await this.request.post('/api/users/login', {
            data: { username, password },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }
}

module.exports = { UserAPI };
