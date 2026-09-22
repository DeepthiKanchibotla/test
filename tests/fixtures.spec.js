const { test,expect } = require('@playwright/test');
const { customtest } = require('../tests/utils/fixtures');

customtest('Custom fixtures', async ({ authenticatedPage, createEvent }) => {

    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventId = createEvent.data.id;
    const eventName = createEvent.data.title;
    console.log('Created Event ID:', eventId);
    console.log('Created Event Name:', eventName);
    expect(eventId).toBeTruthy();
    expect(eventName).toBeTruthy();

})
