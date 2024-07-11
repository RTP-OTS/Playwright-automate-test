exports.LoginPage = class LoginPage {
    

    constructor(page){
        this.page = page
        this.login_email_textbox = page.locator('#Email');
        this.login_password_textbox = page.locator('#Password');
        this.button_login = page.getByRole('button', { name: 'Log in' });
        this.first_name = page.locator('#FirstName');
    }
    async screenPage (){
        await this.page
            .setViewportSize({ width: 1920, height: 1080 });
    }
    async gotoLoginPage (){
        await this.page
            .goto('https://demo.nopcommerce.com/login?returnUrl=%2F');
    }
    async inputEmail (Email){
        await this.login_email_textbox
            .fill(Email);
    }
    async inputPassword (Password){
        await this.login_password_textbox
            .fill(Password);
    }
    async clickforlogin (){
        await this.button_login
            .click();
    }
    async loginSuccess(){
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.getByRole('link', { name: 'My account' })
            .first().click(),
        ]);
    }

    async editFistname(Firstname){
        await this.first_name
            .fill(Firstname)
    }
    
    
}