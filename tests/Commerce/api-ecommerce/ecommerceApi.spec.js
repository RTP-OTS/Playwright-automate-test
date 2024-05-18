const { test, expect } = require('@playwright/test');
const { ProductAPI } = require('../../../page/api/productApi');
const { UserAPI } = require('../../../page/api/userApi');
const { CartAPI } = require('../../../page/api/cartApi');

test.describe('eCommerce API Tests', () => {
    let productAPI, userAPI, cartAPI;
    let userId, productId;

    test.beforeEach(async ({ request }) => {
        productAPI = new ProductAPI(request);
        userAPI = new UserAPI(request);
        cartAPI = new CartAPI(request);
    });

    test('Create New Product', async () => {
        const product = await productAPI.createProduct('New Product', 'Product description', 99.99, 100);
        productId = product.id;
    });

    test('Get Product Details', async () => {
        const product = await productAPI.getProduct(productId);
        expect(product.id).toBe(productId);
    });

    test('Update Product Information', async () => {
        const updatedProduct = await productAPI.updateProduct(productId, 'Updated Product', 79.99);
        expect(updatedProduct.name).toBe('Updated Product');
        expect(updatedProduct.price).toBe(79.99);
    });

    test('Delete Product', async () => {
        await productAPI.deleteProduct(productId);
    });

    test('List All Products', async () => {
        const products = await productAPI.listProducts();
        expect(Array.isArray(products)).toBeTruthy();
    });

    test('Create New User', async () => {
        const user = await userAPI.createUser('newuser', 'password123', 'newuser@example.com');
        userId = user.id;
    });

    test('User Login', async () => {
        const loginResponse = await userAPI.loginUser('newuser', 'password123');
        expect(loginResponse.token).toBeDefined();
    });

    test('Add Product to Cart', async () => {
        const cart = await cartAPI.addProductToCart(productId, 2);
        expect(cart.items.length).toBeGreaterThan(0);
    });

    test('View Cart', async () => {
        const cart = await cartAPI.viewCart();
        expect(cart.items.length).toBeGreaterThan(0);
    });

    test('Checkout', async () => {
        const checkout = await cartAPI.checkout('credit_card', '123 Main St, Anytown, USA');
        expect(checkout.orderId).toBeDefined();
    });
});
