import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { HudlHomePage } from "../pages/HudlHomePage";

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
  test("User has credentials defined in their .env file", async ({ hudlLoginData }) => {
    expect(hudlLoginData.email).toBeDefined();
    expect(hudlLoginData.password).toBeDefined();
  });

  test("User able to successfully log into Hudl with valid credentials", async ({
    hudlLoginPage,
    hudlLoginData,
    page,
  }) => {
    await hudlLoginPage.loginViaEmail(hudlLoginData.email, hudlLoginData.password);

    const hudlHomePage = new HudlHomePage(page);

    expect(hudlLoginPage.loginForm).not.toBeVisible();
    expect(hudlHomePage.globalNavBar).toBeVisible();
  });

  test("Clicking the edit button redirects users to the previous state without a password input", async ({
    hudlLoginPage,
    hudlLoginData,
  }) => {
    await hudlLoginPage.enterInEmail(hudlLoginData.email);
    await hudlLoginPage.clickEditEmailButton();

    expect(hudlLoginPage.passwordInput).not.toBeVisible();
    expect(hudlLoginPage.emailInput).toHaveValue(hudlLoginData.email);
  });

  test("User able to successfully login after editing email", async ({ hudlLoginPage, hudlLoginData, page }) => {
    await hudlLoginPage.enterInEmail("fakeEmail@email.com");
    await hudlLoginPage.clickEditEmailButton();
    await hudlLoginPage.loginViaEmail(hudlLoginData.email, hudlLoginData.password);

    const hudlHomePage = new HudlHomePage(page);

    expect(hudlLoginPage.loginForm).not.toBeVisible();
    expect(hudlHomePage.globalNavBar).toBeVisible();
  });

  test.describe("Negative Login Scenarios", () => {
    test("User unable to advance with blank email", async ({ hudlLoginPage }) => {
      await hudlLoginPage.enterInEmail("");

      expect(hudlLoginPage.passwordInput).not.toBeVisible();
    });

    test("User unable to login with invalid email", async ({ hudlLoginPage }) => {
      await hudlLoginPage.enterInEmail("badEmail");

      expect(hudlLoginPage.invalidEmailError).toBeVisible();
      expect(hudlLoginPage.invalidEmailError).toContainText("Enter a valid email.");
    });

    test("User unable to advance without entering password", async ({ hudlLoginPage, hudlLoginData, page }) => {
      await hudlLoginPage.enterInEmail(hudlLoginData.email);
      await hudlLoginPage.enterInPassword("");
      const hudlHomePage = new HudlHomePage(page);

      expect(hudlLoginPage.loginForm).toBeVisible();
      expect(hudlHomePage.globalNavBar).not.toBeVisible();
    });

    test("User unable to login with invalid password", async ({ hudlLoginPage, hudlLoginData }) => {
      await hudlLoginPage.enterInEmail(hudlLoginData.email);
      await hudlLoginPage.enterInPassword("badPassword");

      expect(hudlLoginPage.incorrectPasswordError).toBeVisible();
      expect(hudlLoginPage.incorrectPasswordError).toContainText("Your email or password is incorrect. Try again.");
    });
  });
});
