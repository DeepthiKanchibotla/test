const {test} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.getByRole('textbox', { name: "email" }).fill("deepudeepthi447@gmail.com");
    await page.locator('#userPassword').fill("9494381056@Gowtham");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext = await browser.newContext({storageState : 'state.json'});
})

test("Storage State", async()=>{

    const page= await webContext.newPage();

})