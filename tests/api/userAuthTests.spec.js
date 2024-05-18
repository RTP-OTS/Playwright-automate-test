import { test, expect } from '@playwright/test';

const baseURL = 'https://reqres.in';

test.describe('Register User API Tests', () => {

  test('Register and Login with Valid Data', async ({ request }) => {
    const responseRegister = await request.post(`${baseURL}/api/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    });
    expect(responseRegister.status()).toBe(200);
    const responseRegisterBody = await responseRegister.json();
    expect(responseRegisterBody).toHaveProperty('token');
  });

  test('Login with Valid Data' , async ({ request }) =>{
    const responseLogin = await request.post(`${baseURL}/api/login`, {
        data: {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        } 
    });
    expect(responseLogin.status()).toBe(200);
    const resonseLoginBody = await responseLogin.json();
    expect(resonseLoginBody).toHaveProperty('token');
  });

});
