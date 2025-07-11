import { test, Page, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://demo.playwright.dev/todomvc');
// });

// const TODO_ITEMS = [
//   'buy some cheese',
//   'feed the cat',
//   'book a doctors appointment'
// ] as const;

test.describe("Navigation", () => {
  test("Navigate to the homepage successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(page).toHaveURL("https://www.hudl.com/");
  });
});
