const {test , expect} = require('@playwright/test')
const JSONdata = require('../../resource/config.json')

test ('Test shopping standard flow' , async ({page}) =>{
    //step1
    await page.goto(JSONdata.baseUrl);
    await page.locator("#userEmail").fill(JSONdata.user.username);
    await page.locator("#userPassword").fill(JSONdata.user.password);
    await page.locator("#login").click();

    //step2
    await page.waitForLoadState('networkidle');
    const titileItem = await page.locator(".card-body b").allTextContents();
    //console.log(titileItem);
    const productName = "ADIDAS ORIGINAL";
    expect(titileItem).toContain(productName);
    const product = page.locator(".card-body");
    const count = await product.count();
    let i = 0;
    while (i < count) {
        const productText = await product.nth(i).locator("b").textContent();
        if (productText === productName) {
            await product.nth(i).getByText("Add To Cart").click();
            break;
        }
        i++;
    }

    //step3
    await page.locator('[routerlink="/dashboard/cart"]').click();
    const itemIncart = await page.locator(".cartSection h3")
    //console.log(await itemIncart.textContent());
    await expect(itemIncart).toContainText(productName)

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").type("ind");
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const buttons = await dropdown.locator("button").elementHandles();
    for (const button of buttons) {
        const text = await button.textContent();
        if (text === " India") {
            await button.click();
            break;
        }
    }
  
    expect(page.locator(".user__name [type='text']").first()).toHaveText(JSONdata.user.username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody tr");
    let j = 0;
    const rowCount = await rows.count();
    while (j < rowCount) {
        const rowOrderId = await rows.nth(j).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(j).locator("button").first().click();
            break;
        }
        j++;
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
 });
