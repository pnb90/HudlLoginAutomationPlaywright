import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navigation", () => {
  test("Navigate to the homepage successfully", async ({ homePage }) => {
    await homePage.navigate();

    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toEqual("https://www.hudl.com/");
  });
});
