class ProductAPI {
    constructor(request) {
        this.request = request;
    }

    async createProduct(name, description, price, stock) {
        const response = await this.request.post('/api/products', {
            data: { name, description, price, stock },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(201);
        return await response.json();
    }

    async getProduct(id) {
        const response = await this.request.get(`/api/products/${id}`);
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async updateProduct(id, name, price) {
        const response = await this.request.put(`/api/products/${id}`, {
            data: { name, price },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async deleteProduct(id) {
        const response = await this.request.delete(`/api/products/${id}`);
        expect(response.status()).toBe(204);
    }

    async listProducts() {
        const response = await this.request.get('/api/products');
        expect(response.status()).toBe(200);
        return await response.json();
    }
}

module.exports = { ProductAPI };
