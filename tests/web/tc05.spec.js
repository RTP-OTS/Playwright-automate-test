const {test,expect} = require('@playwright/test');
const exp = require('constants');

test ('test' , async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.locator("[name='email']").fill("email@email.com")
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByRole('button', {name:"Submit"}).click();

    const checkdialogSuccess = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect (checkdialogSuccess).toBeTruthy();

    });