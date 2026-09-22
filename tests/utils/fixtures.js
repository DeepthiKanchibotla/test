const { test: base, expect } = require('@playwright/test');
const eventTitle = `Automation Event ${Date.now()}`;


exports.customtest = base.test.extend({

    authenticatedPage: async ({ page }, use) => {

        await page.goto("https://eventhub.rahulshettyacademy.com");
        await page.getByPlaceholder("you@email.com").fill("deepudeepthi447@gmail.com");
        await page.locator("input#password").fill("9494381056@Gowtham");
        await page.getByRole("button", { name: 'Sign In' }).click();
        await expect(page.getByText("Browse Events →")).toBeVisible();
        await use(page);
        await page.close();

    },
    createEvent: async ({ request }, use) => {
        const loginResponse = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: {
                    email: 'deepudeepthi447@gmail.com',
                    password: '9494381056@Gowtham'
                }
            }
        );

        expect(loginResponse.ok()).toBeTruthy();

        const loginBody = await loginResponse.json();

        const token = loginBody.token;

        console.log('Login successful');

        const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/events', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                title: eventTitle,
                description: 'test',
                category: 'Workshop',
                venue: 'madhapur hyderabad',
                city: 'hyderabad',
                eventDate: '2026-09-30T18:14:00.000Z',
                price: '100',
                totalSeats: 1700
            }
        });
        console.log('Status:', response.status());
        console.log('Body:', await response.text());
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        console.log('Created Event:', responseBody);
        await use(responseBody);
    }
})