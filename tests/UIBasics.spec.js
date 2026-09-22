const {test} = require('@playwright/test');

test('Practise page', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("deepudeepthi447@gmail.com");
    await page.locator("#userPassword").fill("9494381056@Gowtham");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator("//div[@class='card-body']/h5/b").allTextContents());

})