class login {

    constructor(page) {
        this.page = page;
    }


    async loginAndGoToBooking(page, baseUrl){
      await page.goto(baseUrl);
        await page.getByPlaceholder("you@email.com").fill("deepudeepthi447@gmail.com");
        await page.locator("input#password").fill("9494381056@Gowtham");
        await page.getByRole("button", { name: 'Sign In' }).click();
        
  }
       
 
}
module.exports = {login};
