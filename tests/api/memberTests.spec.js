import { test, expect } from '@playwright/test';
import UserApi from '../../page/api/userApi';
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
    expect(responseBody).toHaveProperty('name', testData.user.name);
    expect(responseBody).toHaveProperty('job', testData.user.job);
    expect(responseBody).toHaveProperty('id');

    // เก็บ ID ของผู้ใช้ที่สร้างขึ้นมาเพื่อใช้ในภายหลัง
    console.log(responseBody.json)
    createdUserId = responseBody.id;
  });


  test('PUT - Update User', async () => {
    const updatedData = { name: "Lion King", job: "King of Puppets" };
    const response = await userApi.updateUser(createdUserId, updatedData);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', updatedData.name);
    expect(responseBody).toHaveProperty('job', updatedData.job);
  });

  test('DELETE - Delete User', async () => {

    const response = await userApi.deleteUser(createdUserId);
    expect(response.status()).toBe(204);
  });
});
