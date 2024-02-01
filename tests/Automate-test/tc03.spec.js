const {test, expect} = require('@playwright/test')

test.skip('Handle windows' , async ({page})=>{

    const user = "rahulshettyacademy"
    const password = "learning"
    const inputUsername =  page.locator("#username")
    const inputPassword =  page.locator("#password")
    const btnLogin =  page.locator("#signInBtn")
    const docLink = page.locator("[href*='documents-request']")
    const cardItem =  page.locator(".card-body a")

    await page.goto('https://rahulshettyacademy.com/client')
    console.log(await page.title());
    await inputUsername.fill(user);
    await inputPassword.fill(password);
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("teach");
    const countItem = await page.locator().count();
    for(let i =0; i < countItem; ++i)
    {
        if(await page.locator("#").textContent("test") === product){
            await product.click();
            break;
        }
    }
})


 
test('SC01' , async ({page})=>{
    const user = "rahulshettyacademy"
    const password = "learning"
    const inputUsername =  page.locator("#username")
    const inputPassword =  page.locator("#password")
    const btnLogin =  page.locator("#signInBtn")
    const docLink = page.locator("[href*='documents-request']")
    const cardItem =  page.locator(".card-body a")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());
    await inputUsername.fill(user);
    await inputPassword.fill(password);
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("teach");
    await expect(docLink).toHaveAttribute("class","blinkingText");
    console.log(docLink)

    await btnLogin.click();
    console.log(await cardItem.first().textContent());
    // console.log(await cardItem.nth(1).textContent());
    const allCartitem = await cardItem.allTextContents();
    console.log(allCartitem)


});