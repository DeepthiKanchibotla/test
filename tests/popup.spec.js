const { test, expect } = require('@playwright/test');


test('PopUp Validations', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //popup validation
    await page.getByRole('button', { name: 'Confirm' }).click();
    page.on('dialog', dialog => dialog.accept());

    //hover
    await page.getByRole("button", { name: 'Mouse Hover' }).hover();

    //frame
    const iFrame = page.frameLocator("#courses-iframe");
    await iFrame.locator("li a[href*='lifetime-access'] : visible").click();
    const text= await iFrame.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

})