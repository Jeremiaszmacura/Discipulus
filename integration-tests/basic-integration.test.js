const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require("../server.js");

let server = null;
let port = null;

beforeEach(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

test('Home page allows to redirect to about page.', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/about`);
    await browser.close();
});
