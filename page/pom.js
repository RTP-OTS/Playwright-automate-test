class LoginPage{

        constructor(page){
            this.page = page
            this.firsname_textbox = page.locator('#firstName')
            this.lastname_textbox = page.locator('#lastName')
        }

        async login (firstname , lastname){
            await this.firsname_textbox.fill('Automate')
            await this.lastname_textbox.fill('Tester')
        }
}