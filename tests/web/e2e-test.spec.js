const { test , expect }=require ('@playwright/test');
const { RegisterPage }=require  ('../../pageObjects/web/RegisterPage');
const { LoginPage }=require ('../../pageObjects/web/LoginPage');
const { generateRandomEmail }=require ('../../utils/function/utils_generateEmail');
const { testData } = require('../../resource/data/userData.json')

const randomEmail = generateRandomEmail();
let registeredEmail;
registeredEmail = randomEmail;

test.describe('User Registration and Login Tests', () => {
    test.describe.configure({ mode: 'serial' });
    
    test ('tc01-Register a new member' , async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.screenPage();
        await registerPage.gotoLoginPage();
        await registerPage.checkGender();
        await registerPage.inputFirstname(member1.firstname);
        await registerPage.inputLastname(member1.lastname);
        await registerPage.inputBirthDay({index: 30});
        await registerPage.inputBirthMonth({index: 8});
        await registerPage.inputBirthYear({index: 80});
        await registerPage.inputEmail(randomEmail)
            console.log (registeredEmail)
        await registerPage.inputCompany(member1.company);
        await registerPage.checkNewsletter();
        await registerPage.inputnewPassword(member1.password);
        await registerPage.inputConfirmPassword(member1.password);
        await registerPage.clickRegister();
        // Waiting for url change
        await registerPage.registerSuccess();
    });
    test ('tc02-Login with new member' , async ({ page }) => {
        const loginPage = new LoginPage (page);
        await loginPage.screenPage();
        await loginPage.gotoLoginPage();
        await loginPage.inputEmail(registeredEmail);
            console.log (registeredEmail)
        await loginPage.inputPassword(member1.password);
        await loginPage.clickforlogin();
        await loginPage.loginSuccess();
        expect(page.url()).toBe('https://demo.nopcommerce.com/customer/info')
        await loginPage.editFistname('Rattapon');
        expect(registeredEmail).toBe(randomEmail);
    });

});