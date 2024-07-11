import { test, expect } from '@playwright/test';
import LoginApi from '../../pageObjects/api/loginApi';
import testData from '../../resource/data/userData.json';

test.describe('Login User API Tests', () => {
  let loginApi;

  test.beforeEach(async ({ request }) => {
    loginApi = new LoginApi(request);
  });

  test('Login with Valid Data', async () => {
    const response = await loginApi.loginWithValidData(testData.member.validEmail, testData.member.validPassword);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('Login with Missing Email', async () => {
    const response = await loginApi.loginWithMissingEmail(testData.member.validPassword);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Missing email or username');
  });

  test('Login with Missing Password', async () => {
    const response = await loginApi.loginWithMissingPassword(testData.member.validEmail);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Missing password');
  });

});
