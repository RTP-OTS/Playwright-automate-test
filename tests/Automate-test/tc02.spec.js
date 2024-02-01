const {test, expect} = require('@playwright/test')

test('SC01' , async ({page})=>{
    const userName =  page.locator("#username")
    const password =  page.locator("#password")
    const btnLogin =  page.locator("#signInBtn")
    const cardItem =  await page.locator(".card-body a")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator("select.form-control").selectOption("teach");
    await btnLogin.click();


});