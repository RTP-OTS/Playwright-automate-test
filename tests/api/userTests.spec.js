import { test, expect } from '@playwright/test';
import UserApi from '../../pageObjects/userApi';
import testData from '../../resource/data/userData.json';

test.describe('User CRUD API Tests', () => {
  let userApi;
  let createdUserId;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request);
  });

  test('POST - Create User', async () => {
    const response = await userApi.createUser(testData.user);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name', testData.user.name);
    expect(responseBody).toHaveProperty('job', testData.user.job);

    // เก็บ ID ของผู้ใช้ที่สร้างขึ้นมาเพื่อใช้ในภายหลัง
    createdUserId = responseBody.id;
  });

  test('GET - Retrieve User', async () => {
    // ต้องตรวจสอบให้แน่ใจว่า POST - Create User ผ่านไปก่อนถึงจะรัน GET - Retrieve User
    expect(createdUserId).toBeDefined();

    const response = await userApi.getUser(createdUserId);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data).toHaveProperty('id', createdUserId);
  });

  test('PUT - Update User', async () => {
    // ต้องตรวจสอบให้แน่ใจว่า POST - Create User ผ่านไปก่อนถึงจะรัน PUT - Update User
    expect(createdUserId).toBeDefined();

    const updatedData = { name: "Lion King", job: "King of Puppets" };
    const response = await userApi.updateUser(createdUserId, updatedData);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', updatedData.name);
    expect(responseBody).toHaveProperty('job', updatedData.job);
  });

  test('DELETE - Delete User', async () => {
    // ต้องตรวจสอบให้แน่ใจว่า POST - Create User ผ่านไปก่อนถึงจะรัน DELETE - Delete User
    expect(createdUserId).toBeDefined();

    const response = await userApi.deleteUser(createdUserId);
    expect(response.status()).toBe(204);
  });
});
