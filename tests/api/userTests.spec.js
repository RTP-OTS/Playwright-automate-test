import { test, expect } from '@playwright/test';

test.describe('User API Tests', () => {
    let userId; 

    test('POST - Create User', async ({ request }) => {
        const response = await request.post('https://reqres.in/api/user/',{
            data:{
                "name":"Sea",
                "job": "Archer"}
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.name).toEqual("Sea");
        expect(responseBody.job).toEqual("Archer");
        expect(responseBody).toHaveProperty('id');

        // Keep user id for used
        userId = responseBody.id;
      });

      test('Put - Update User', async ({ request }) =>{
        const response = await request.put('https://reqres.in/api/user/'+userId, {
            data : {
                "name":"Sky",
                "job":"Hunter"
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.name).toEqual("Sky")
        expect(responseBody.job).toEqual("Hunter");
    })
      
});