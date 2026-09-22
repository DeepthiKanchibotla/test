const {test , expect} = require('@playwright/test');

test('Dropdown validations', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //dropdown validations
    const dropdown= page.locator("select.form-control");
    await dropdown.selectOption("consult");  

    //radio button validations
    await page.locator(".radiotextsty").nth(1).click();
    await expect( page.locator(".radiotextsty").nth(1)).toBeChecked();



    //check box validations
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
     expect(await page.locator("#terms").isChecked()).toBeFalsy();
     


})