import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navigation", () => {
  test("Navigate to the landing page successfully", async ({ landingPage }) => {
    const currentUrl = await landingPage.getCurrentUrl();
    expect(currentUrl).toEqual("https://www.hudl.com/");
  });

  test("Clicking on Hudl Link navigates to Hudl login", async ({ landingPage }) => {
    await landingPage.openHudlLoginPage();
    const currentUrl = await landingPage.getCurrentUrl();
    expect(currentUrl).toContain("identity.hudl.com");
  });
});

test.describe("Login", () => {
  test("User able to successfully log into Hudl with valid credentials", async ({ hudlLoginPage, page }) => {
    const { HUDLEMAIL, HUDLPASSWORD } = process.env;
    await hudlLoginPage.loginViaEmail(HUDLEMAIL, HUDLPASSWORD);

    expect(page.url()).toContain("/home");
  });

  test("User unable to login with invalid email", async ({ hudlLoginPage, page }) => {
    await hudlLoginPage.enterInEmail("badEmail");

    expect(hudlLoginPage.invalidEmailError).toBeVisible();
    expect(hudlLoginPage.invalidEmailError).toContainText("Enter a valid email.");
  });

  test("User unable to login with invalid password", async ({ hudlLoginPage, page }) => {
    const { HUDLEMAIL } = process.env;
    await hudlLoginPage.enterInEmail(HUDLEMAIL);
    await hudlLoginPage.enterInPassword("badPassword");

    expect(hudlLoginPage.incorrectPasswordError).toBeVisible();
    expect(hudlLoginPage.incorrectPasswordError).toContainText("Your email or password is incorrect. Try again.");
  });
});
