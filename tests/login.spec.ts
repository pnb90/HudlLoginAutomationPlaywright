import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { HudlHomePage } from "../pages/HudlHomePage";

test.describe("Navigation", () => {
  test("Navigate to the landing page successfully", ({ landingPage }) => {
    const currentUrl = landingPage.getCurrentUrl();
    expect(currentUrl).toEqual("https://www.hudl.com/");
  });

  test("Clicking on Hudl Link navigates to Hudl login", async ({ landingPage }) => {
    const loginPage = await landingPage.openHudlLoginPage();
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain("identity.hudl.com");
  });
});

test.describe("Login", () => {
  test("User able to successfully log into Hudl with valid credentials", async ({ hudlLoginPage, hudlLoginData }) => {
    const hudlHomePage = await hudlLoginPage.loginViaEmail(hudlLoginData.email, hudlLoginData.password);

    await expect(hudlLoginPage.loginForm).not.toBeVisible();
    await expect(hudlHomePage.globalNavBar).toBeVisible();
  });

  test("Clicking the edit button redirects users to the previous state without a password input", async ({
    hudlLoginPage,
    hudlLoginData,
  }) => {
    await hudlLoginPage.enterInEmail(hudlLoginData.email);
    await hudlLoginPage.clickEditEmailButton();

    await expect(hudlLoginPage.passwordInput).not.toBeVisible();
    await expect(hudlLoginPage.emailInput).toHaveValue(hudlLoginData.email);
  });

  test("User able to successfully login after editing email", async ({ hudlLoginPage, hudlLoginData, page }) => {
    await hudlLoginPage.enterInEmail("fakeEmail@email.com");
    await hudlLoginPage.clickEditEmailButton();
    const hudlHomePage = await hudlLoginPage.loginViaEmail(hudlLoginData.email, hudlLoginData.password);

    await expect(hudlLoginPage.loginForm).not.toBeVisible();
    await expect(hudlHomePage.globalNavBar).toBeVisible();
  });

  test.describe("Negative Login Scenarios", () => {
    test("User unable to advance with blank email", async ({ hudlLoginPage }) => {
      await hudlLoginPage.enterInEmail("");

      await expect(hudlLoginPage.passwordInput).not.toBeVisible();
    });

    test("User unable to login with invalid email", async ({ hudlLoginPage }) => {
      await hudlLoginPage.enterInEmail("badEmail");

      await expect(hudlLoginPage.invalidEmailError).toBeVisible();
      await expect(hudlLoginPage.invalidEmailError).toContainText("Enter a valid email.");
    });

    test("User unable to advance without entering password", async ({ hudlLoginPage, hudlLoginData, page }) => {
      await hudlLoginPage.enterInEmail(hudlLoginData.email);
      await hudlLoginPage.enterInPassword("");
      const hudlHomePage = new HudlHomePage(page);

      await expect(hudlLoginPage.loginForm).toBeVisible();
      await expect(hudlHomePage.globalNavBar).not.toBeVisible();
    });

    test("User unable to login with invalid password", async ({ hudlLoginPage, hudlLoginData }) => {
      await hudlLoginPage.enterInEmail(hudlLoginData.email);
      await hudlLoginPage.enterInPassword("badPassword");

      await expect(hudlLoginPage.incorrectPasswordError).toBeVisible();
      await expect(hudlLoginPage.incorrectPasswordError).toContainText(
        "Your email or password is incorrect. Try again."
      );
    });
  });
});
