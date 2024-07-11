exports.RegisterPage = class RegisterPage {
    
    constructor(page){
        this.page = page
        this.gender_checkbox = page.locator('#gender-male');
        this.firstname_textbox = page.locator('#FirstName');
        this.lastname_textbox = page.locator('#LastName');
        this.dateofBirthDay_box = page.locator('select[name="DateOfBirthDay"]');
        this.dateofBirthMonth_box = page.locator('select[name="DateOfBirthMonth"]');
        this.dateofBirthYear_box = page.locator('select[name="DateOfBirthYear"]');
        this.email_textbox = page.locator('#Email');
        this.company_textbox = page.locator('#Company');
        this.newsletter_checkbox = page.locator('#Newsletter');
        this.newpassword_textbox = page.locator('#Password');
        this.confirmpassword_textbox = page.locator('#ConfirmPassword');
        this.button_login = page.locator('#register-button');
        this.button_continue = page.getByRole('button', { name: 'Continue' });
    }

    async screenPage (){
        await this.page
        .setViewportSize({ width: 1920, height: 1080 });
    }
    async gotoLoginPage (){
        await this.page
            .goto('https://demo.nopcommerce.com/register?returnUrl=%2F');
    }
    async checkGender (Gender){
        await this.gender_checkbox
            .click();
    }
    async inputFirstname (Firstname){
        await this.firstname_textbox
            .fill(Firstname);
    }
    async inputLastname (Lastname){
        await this.lastname_textbox
            .fill(Lastname);
    }
    async inputBirthDay (BirthDay){
        await this.dateofBirthDay_box
            .selectOption(BirthDay);
    }
    async inputBirthMonth (BrithMonth){
        await this.dateofBirthMonth_box
            .selectOption(BrithMonth);
    }
    async inputBirthYear (DateOfBirthYear){
        await this.dateofBirthYear_box
            .selectOption(DateOfBirthYear);
    }
    async inputEmail (randomEmail){    
        await this.email_textbox
            .fill(randomEmail)
    }
    async inputCompany (Company){
        await this.company_textbox
            .fill(Company);
    }
    async checkNewsletter() {
        // Check the newsletter checkbox only if it is not already checked
        const isNewsletterChecked = await this.newsletter_checkbox.isChecked();
        if (!isNewsletterChecked) {
          await this.newsletter_checkbox.click();
        }
      }
    async inputnewPassword (NewPassword){
        await this.newpassword_textbox
            .fill(NewPassword);
    }
    async inputConfirmPassword (ComfirmPassword){
        await this.confirmpassword_textbox
            .fill(ComfirmPassword);
    }
    async clickRegister (){
        await this.button_login
            .click();
    }
    async clickContinue (){
        await this.button_continue
            .click();
    }
    async registerSuccess() {
        await Promise.all([
          this.page.waitForNavigation(),
          this.page.getByRole('link', { name: 'Continue' })
            .click(),  // Trigger the navigation action
        ]);
    }
    
    
}