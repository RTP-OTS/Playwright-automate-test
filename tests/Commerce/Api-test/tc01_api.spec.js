const { test , expect } = require ('@playwright/test');
var userid

test ("Get User" , async ({request}) => {
    const responseUser = await request.get('https://reqres.in/api/users?page=2')
        console.log(await responseUser.json())
        expect(responseUser.status()).toBe(200)
})

test ("Create User" , async ({request}) => {
    const resonseCreate =await request.post('https://reqres.in/api/users',
    {
        data:{ "name":"Kitty" ,
        "job": "System Engineer" },
        headers:{"Accept":"application/json"}

        });
        console.log(await resonseCreate.json())
        expect(resonseCreate.status()).toBe(201)

        let res=await resonseCreate.json()
        userid=res.id
    })

test ("Update User and verify message after this" , async ({request}) => {
    const resonseUpdate =await request.put('https://reqres.in/api/users/'+ userid,
    {
        data:{ "name":"Toon" ,
         "job": "QA Automated" },
        headers:{"Accept":"application/json"}

        });
        console.log(await resonseUpdate.json())
        expect(resonseUpdate.status()).toBe(200)

        const jsonResponse = await resonseUpdate.json()
        expect(jsonResponse.name).toContain('Toon')
        expect(jsonResponse.job).toContain('QA Automated')
    })

test ("Delete user after update " , async ({request}) => {
    const responseUser = await request.delete('https://reqres.in/api/users'+userid,)
        expect(responseUser.status()).toBe(204)
})


