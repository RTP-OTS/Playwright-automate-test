const { test , expect }=require ('@playwright/test');
const { RegisterPage }=require  ('../../page/RegisterPage');
const { LoginPage }=require ('../../page/LoginPage');
const { generateRandomEmail }=require ('../../page/utils_generateEmail');

const firstname = "John"
const lastname = "Denined"
//const email ="Demotesting01x@gmail.com";
const password = "asdfgqwerwe@789465!";
const company ='automated'
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
        await registerPage.inputFirstname(firstname);
        await registerPage.inputLastname(lastname);
        await registerPage.inputBirthDay({index: 30});
        await registerPage.inputBirthMonth({index: 8});
        await registerPage.inputBirthYear({index: 80});
        await registerPage.inputEmail(randomEmail)
            console.log (randomEmail)
        await registerPage.inputCompany(company);
        await registerPage.checkNewsletter();
        await registerPage.inputnewPassword(password);
        await registerPage.inputConfirmPassword(password);
        await registerPage.clickRegister();
        // Waiting for url change
        await registerPage.registerSuccess();
    });
    test ('tc02-Login with new member' , async ({ page }) => {
        const loginPage = new LoginPage (page);
        await loginPage.screenPage();
        //const ToLoginpage = await page.getByText("Welcome, Please Sign In!")
        //expect(ToLoginpage).toBe("Welcome, Please Sign In!");
        await loginPage.gotoLoginPage();
        await loginPage.inputEmail(registeredEmail);
            console.log (registeredEmail)
        await loginPage.inputPassword(password);
        await loginPage.clickforlogin();
        await loginPage.loginSuccess();
        const ExpectCustomerInfo = await page.url()
            expect(ExpectCustomerInfo).toBe('https://demo.nopcommerce.com/customer/info')
        await loginPage.editFistname('Rattapon');
        expect(registeredEmail).toBe(randomEmail);
    });

});