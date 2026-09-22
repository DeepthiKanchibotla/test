const { test, expect } = require('@playwright/test');

test('End to End test', async ({ page }) => {

    const actualProduct = "ZARA COAT 3";
    const products = page.locator("div.card-body");

    //login page
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.getByRole('textbox', { name: "email" }).fill("deepudeepthi447@gmail.com");
    await page.locator('#userPassword').fill("9494381056@Gowtham");
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');
    await products.first().waitFor();

    //add product to card
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() == actualProduct) {
           await products.nth(i).locator("//button[text()=' Add To Cart']").click();
           break;
        }
    }

    //verifying the cart
    await page.locator("//button[contains(@routerlink,'cart')]").click();
    await page.locator("li.items").waitFor();
    const value=await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(value).toBeTruthy();
    await page.getByText("Checkout").click();

    //verifying the payment page
    await page.locator(".item__details").waitFor();
    const paymentproduct= await page.locator("div.item__title").textContent();
    expect(paymentproduct.trim()).toEqual(actualProduct.trim());

    //Personal Information
    await page.locator("//div[@class='field']/input[contains(@class,'input txt text-validated')]").fill("5427364782738282");

    const month = page.locator('select.input.ddl').nth(0);
    await month.waitFor();
    await month.selectOption('05');

    const date = page.locator('select.input.ddl').nth(1);
    await date.waitFor();
    await date.selectOption('17');
     
    await page.locator('input[type="text"]').nth(1).fill("342");
    await page.locator('input[type="text"]').nth(2).fill("Deepthi");

    //Shipping Information
    await page.locator('input[placeholder="Select Country"]').pressSequentially("ind" , {delay: 1500});
    await page.waitForLoadState('networkidle');
    const options= page.locator('section.ta-results');
    await options.waitFor();
    const values= await options.locator('button').count();

    for(let i=0; i<values; ++i){
       const expectedCountry= await options.locator('button').nth(i).textContent();
       if(expectedCountry  === " India"){
          await options.locator('button').nth(i).click();
          await page.waitForLoadState();
          break;
       }
    }


    await page.locator('.action__submit').click();
    
    //Thank you verification
    const message=await page.locator('.hero-primary').textContent();
    expect(message).toEqual(" Thankyou for the order. ");
    const orderid= await page.locator("label.ng-star-inserted").textContent();
    const modifiedorderid=orderid.replace(/\|/g, '').trim();
    console.log(modifiedorderid);

    //navigating to order history page
     await page.locator("//label[@routerlink='/dashboard/myorders']").click();
     await page.waitForLoadState('networkidle');
     await page.locator(".table-bordered").waitFor();

     const row= page.locator("//tbody/tr");

     const rowcount=await row.count();
     console.log(rowcount);
     for(let i=0; i<rowcount; ++i){
        const expectedProductId= await row.locator("//th").nth(i).textContent();
        console.log(expectedProductId);
        if( expectedProductId === modifiedorderid){
            await page.locator(".btn-primary").nth(i).click();
            break;
        }
     }

    //verify order summary page
    // await page.locator("div.email-title").waitFor();
    const id= await page.locator("div.col-text").nth(0).textContent();
     expect(id).toEqual(modifiedorderid);
})
