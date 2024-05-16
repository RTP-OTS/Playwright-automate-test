class CartAPI {
    constructor(request) {
        this.request = request;
    }

    async addProductToCart(productId, quantity) {
        const response = await this.request.post('/api/cart', {
            data: { productId, quantity },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async viewCart() {
        const response = await this.request.get('/api/cart');
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async checkout(paymentMethod, shippingAddress) {
        const response = await this.request.post('/api/checkout', {
            data: { paymentMethod, shippingAddress },
            headers: { "Accept": "application/json" }
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }
}

module.exports = { CartAPI };
