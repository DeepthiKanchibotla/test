//import {test, expect } from '@playwright/tests';
const { test, expect } = require('@playwright/test');


test('Locators', async({page})=>{
 
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.waitForTimeout(3000);
    //await page.locator("input.ng-touched").first().fill("Deepthi");
    await page.getByLabel("Name").fill("Deepthi");
    await page.locator('[name="email"]').fill("test@gmail.com");
    await page.getByPlaceholder('Password').fill('test@123');
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    //await page.locator('[type="date"]').fill("09/13/2026");
    await page.getByRole("button", {name : 'Submit'}).click();

})
