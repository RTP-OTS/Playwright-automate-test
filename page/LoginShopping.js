exports.LoginPage = class LoginPageShopping {

    constructor(page){
        
        this.page = page
        this.username_textbox = page.locator('#user-name')
        this.password_textbox = page.locator('#password')
        this.button_login = page.locator('#login-button')
    }

    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login (Username , password){
        await this.username_textbox.fill(Username)
        await this.password_textbox.fill(password)
        await this.button_login.click()
    }
}