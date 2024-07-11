import { test, expect } from '@playwright/test';
import RegisterApi from '../../pageObjects/api/registerApi';
import testData from '../../resource/data/userData.json';

test.describe('Register User API Tests', () => {
  let registerApi;

  test.beforeEach(async ({ request }) => {
    registerApi = new RegisterApi(request);
  });

  test('Register with Valid Data', async () => {
    const response = await registerApi.registerWithValidData(testData.member.validEmail, testData.member.validPassword);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('Register with Missing Email', async () => {
    const response = await registerApi.registerWithMissingEmail(testData.member.validPassword);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Missing email or username');
  });

  test('Register with Missing Password', async () => {
    const response = await registerApi.registerWithMissingPassword(testData.member.validEmail);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Missing password');
  });

  test('Register with Invalid Email Format', async () => {
    const response = await registerApi.registerWithInvalidEmailFormat(testData.member.invalidEmail, testData.member.validPassword);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });
});
