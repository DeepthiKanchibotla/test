const { test, expect } = require('@playwright/test');
const { login } = require('./utils/login');

test("Single ticket booking is eligible for refund", async ({ page }) => {

    const base_url = "https://eventhub.rahulshettyacademy.com";
    const loginPageRef = new login(page);

    //login
    await loginPageRef.loginAndGoToBooking(page, base_url);
    await expect(page.getByText("Browse Events →")).toBeVisible();

    //Book first event with 1 ticket (default)
    await page.goto(base_url + '/events');
    await page.locator("#event-card").first().locator("#book-now-btn").click();
    await page.getByLabel("Full Name").fill("Deepthi Kanchibotla");
    await page.getByLabel("Email").fill("deepudeepthi447@gmail.com");
    await page.getByLabel("Phone Number").fill("9347364334");
    await page.getByRole("button", { name: "Confirm Booking" }).click();

    //Navigate to booking detail
    await page.getByRole("button", { name: "View My Bookings" }).click();
    const url = page.url();
    expect(url).toBe(base_url + "/bookings");
    await page.locator("#booking-card button").first().click();
    await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();


    //Validate booking ref
    const bookingref = await page.locator(".max-w-3xl span.text-gray-900").first().textContent();
    const eventTitle = await page.locator("h1.text-2xl").textContent();
    expect(bookingref.charAt(0) === eventTitle.charAt(0));

    //Check refund eligibility
    await page.getByRole("button", { name: 'Check eligibility for refund?' }).click();
    await expect(page.getByRole("status")).toBeVisible({ timeout: 6000 });

    //Validate result
    await expect(page.locator("#refund-result")).toBeVisible();
    const refundText = await page.locator("//strong").textContent();
    expect(refundText).toBe("Eligible for refund.");
    const content = await page.locator("//strong/..").textContent();
    const expectedContent=content.split('.');
    expect(expectedContent[1]).toBe(" Single-ticket bookings qualify for a full refund");
    

})

test("Group ticket booking is NOT eligible for refund", async({page})=>{

     const base_url = "https://eventhub.rahulshettyacademy.com";
    const loginPageRef = new login(page);

    //login
    await loginPageRef.loginAndGoToBooking(page, base_url);
    await expect(page.getByText("Browse Events →")).toBeVisible();

    //Book first event with 1 ticket (default)
    await page.goto(base_url + '/events');
    await page.locator("#event-card").first().locator("#book-now-btn").click();
    await page.getByRole("button", {name:"+"}).click();
    await page.getByRole("button", {name:"+"}).click();
    await page.getByLabel("Full Name").fill("Deepthi Kanchibotla");
    await page.getByLabel("Email").fill("deepudeepthi447@gmail.com");
    await page.getByLabel("Phone Number").fill("9347364334");
    await page.getByRole("button", { name: "Confirm Booking" }).click();

    //Navigate to booking detail
    await page.getByRole("button", { name: "View My Bookings" }).click();
    const url = page.url();
    expect(url).toBe(base_url + "/bookings");
    await page.locator("#booking-card button").first().click();
    await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();

    //Validate booking ref
    const bookingref = await page.locator(".max-w-3xl span.text-gray-900").first().textContent();
    const eventTitle = await page.locator("h1.text-2xl").textContent();
    expect(bookingref.charAt(0) === eventTitle.charAt(0));

    //Check refund eligibility
    await page.getByRole("button", { name: 'Check eligibility for refund?'}).click();
    await expect(page.getByRole("status")).toBeVisible({ timeout: 6000 });

    //Validate result
    await expect(page.locator("#refund-result")).toBeVisible();
    const refundText = await page.locator("//strong").textContent();
    expect(refundText).toBe("Not eligible for refund.");
    const content = await page.locator("//strong/..").textContent();
    const expectedContent=content.split('.');
    expect(expectedContent[1]).toBe(" Group bookings (3 tickets) are non-refundable");
})