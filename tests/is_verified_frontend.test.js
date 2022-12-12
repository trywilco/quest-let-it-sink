/* eslint-disable */
const puppeteer = require("puppeteer");

describe("Check the `isVerified` is present on items", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Shows `isVerified` emoji with text for a verified seller", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });
    page.on("console", (log) => console.log(log.text()));


    await page.waitForSelector(`#item_verified_seller_item .item-footer`, {
      timeout: 5000,
    });
    const itemFooter = await page.$("#item_verified_seller_item .item-footer");
    const text = await itemFooter.evaluate((el) => el.textContent);

    await expect(text).toContain('👽 TOP SELLER');
  }, 60000)

  it("Does not show the `isVerified` emoji for a non verified seller", async () => {
    await page.waitForSelector(`#item_not_verified_seller_item .item-footer`, {
      timeout: 5000,
    });
    const itemFooter = await page.$("#item_not_verified_seller_item .item-footer");
    const text = await itemFooter.evaluate((el) => el.textContent);

    await expect(text).not.toContain('👽 TOP SELLER');
  }, 60000)
});
