const {test, expect} = require('@playwright/test')

test('SC01' , async ({page})=>{
    const userName =  page.locator("#username")
    const password =  page.locator("#password")
    const btnLogin =  page.locator("#signInBtn")
    const cardItem =  page.locator(".card-body a")
    const terms = page.locator('#terms')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await password.fill("learning")
    await page.locator("select.form-control").selectOption("teach");
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await btnLogin.click();

    console.log(await cardItem.first().textContent());
    // console.log(await cardItem.nth(1).textContent());
    const allCartitem = await cardItem.allTextContents();
    console.log(allCartitem)

});

test.skip('SC02' , async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator("#username").fill("testng");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
});

