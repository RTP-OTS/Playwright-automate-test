const { test, expect } = require ('@playwright/test');
const { generateRandomEmail } = require ('../../page/utils_generateEmail');

test('Register page when input invalid information', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');

  // Verify the page title
  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(pageTitle).toBe('nopCommerce demo store. Register');

  // Select gender
  const maleCheckButton = await page.locator('#gender-male');
  await maleCheckButton.click();
  await expect(maleCheckButton).toBeChecked();

  // Fill in first name
  const FnameInput = await page.locator('#FirstName');
  await FnameInput.fill('RTP');
  await expect(FnameInput).toHaveValue('RTP');

  // Fill in last name
  const LnameInput = await page.locator('#LastName');
  await LnameInput.fill('OTGS');
  await expect(LnameInput).toHaveValue('OTGS');

  // Select date of birth
  const optionDateday = await page.locator('select[name="DateOfBirthDay"]');
  await optionDateday.selectOption({ index: 4 });
  await expect(optionDateday).toHaveValue('4');

  const optionMonth = await page.locator('select[name="DateOfBirthMonth"]');
  await optionMonth.selectOption({ index: 8 });
  await expect(optionMonth).toHaveValue('8');

  const optionYear = await page.locator('select[name="DateOfBirthYear"]');
  await optionYear.selectOption({ index: 80 });
  await expect(optionYear).toHaveValue('1992');

  // Generate a random email and fill in the email input
  const randomEmail = generateRandomEmail();
  const EmailInput = await page.locator('#Email');
  await EmailInput.fill(randomEmail);
  // await expect(EmailInput).toHaveValue('Emailtesting02@gmail.com');

  // Fill in company name
  const CompInput = await page.locator('#Company');
  await CompInput.fill('Playwright');
  await expect(CompInput).toHaveValue('Playwright');

  // Check the newsletter option
  const OptionNews = await page.locator('#Newsletter');
  await OptionNews.check();
  await expect(OptionNews).toBeChecked();

  // Fill in the new password
  const NewPasswd = await page.locator('#Password');
  await NewPasswd.fill('abc123456');
  await expect(NewPasswd).toHaveValue('abc123456');

  // Confirm the new password
  const CfPasswd = await page.locator('#ConfirmPassword');
  await CfPasswd.fill('abc123456');
  await expect(CfPasswd).toHaveValue('abc123456');

  // Submit the registration form and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.locator('#register-button').click(),
  ]);

  // Continue to the next page after registration
  await page.getByRole('link', { name: 'Continue' }).click();
});
