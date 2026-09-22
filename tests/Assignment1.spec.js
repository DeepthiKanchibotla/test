const { test, expect } = require('@playwright/test');


test('Book an even', async ({ page }) => {

    const base_url="https://eventhub.rahulshettyacademy.com"
    const titleName='Ganesh Chaturdhi Offer'
    //Login
    await page.goto(base_url);
    await page.getByPlaceholder("you@email.com").fill("deepudeepthi447@gmail.com");
    await page.locator("input#password").fill("9494381056@Gowtham");
    await page.getByRole("button", { name: 'Sign In' }).click();
    await expect(page.getByText("Browse Events →")).toBeVisible();

    //Create a new event
    await page.getByRole("button", { name: 'Admin' }).click();
    await page.locator(".relative a").first().click();
    await expect(page.getByText("+ New Event")).toBeVisible();
    function futureDateValue() {
        const date = new Date();
        // Add 2 days
        date.setDate(date.getDate() + 2);
        // Format: YYYY-MM-DDTHH:mm
        return date.toISOString().slice(0, 16);
    }

    //Find the event card and capture seats
    await page.getByPlaceholder("Event Title").fill(titleName);
    await page.locator("#admin-event-form textarea").fill("Created for testing purpose");
    await page.getByLabel("Category").selectOption("Festival");
    await page.getByLabel("City").fill("Hyderabad");
    await page.getByLabel("Venue").fill("Gachibowli");
    const futureDate = futureDateValue();
    await page.getByLabel("Event Date & Time").fill(futureDate);
    await page.getByLabel("Price ($)").fill("10");
    await page.getByLabel("Total Seats").fill("1000");
    await page.locator("#add-event-btn").click();
    expect(await page.getByText("Event Created").isVisible());

    //Start booking
    await page.locator("a#nav-events").click();
    const allEvents= page.locator("#event-card");
    await expect(allEvents.first()).toBeVisible();
    const seatsBeforeBookingtext=(await allEvents.filter({hasText: titleName}).getByText("seats").innerText());
    const seatsBeforeBooking= parseInt(seatsBeforeBookingtext.trim());
    console.log("Seats before booking: "+seatsBeforeBooking);
    await allEvents.filter({hasText: titleName}).locator('#book-now-btn').click();

    //Fill booking form
     expect(await page.locator("#ticket-count").textContent()).toBe("1");
     await page.getByLabel("Full Name").fill('Deepthi kanchibotla');
     await page.locator("input#customer-email").fill('deepudeepthi447@gmail.com');
     await page.getByLabel('Phone Number').fill('9872635493');
     await page.getByRole('button',{name:'Confirm Booking'}).click();
     
     //Verify booking confirmation

     await expect( page.locator(".booking-ref")).toBeVisible();
     const bookingRef= await  page.locator(".booking-ref").textContent();
     console.log(bookingRef);

    //Verify in My Bookings
     await page.getByRole('button',{name:'View My Bookings'}).click();
     await page.waitForLoadState('networkidle');
     expect(page.url()).toBe(base_url + '/bookings');
     const cards=  page.locator("#booking-card");
     await expect(cards.first()).toBeVisible();
     await expect(cards.locator("span.booking-ref").filter({hasText : bookingRef})).toBeVisible();
     const name= await cards.locator(`(//span[text()='${bookingRef}']/../../h3)`).filter({hasText : titleName}).textContent();
     expect(name).toBe(titleName);
     

     //Verify seat reduction
     await page.goto(base_url + '/events');
     await expect(allEvents.first()).toBeVisible();
     await expect( allEvents.filter({hasText: titleName})).toBeVisible();
     const seatsAfterBookingtext= await allEvents.filter({hasText: titleName}).getByText("seats").innerText();
     const seatsAfterBooking= parseInt(seatsAfterBookingtext.trim());
     console.log("Seats after booking: "+seatsAfterBooking);
      expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
})