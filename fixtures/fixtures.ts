import { test as base } from "@playwright/test";
import { HudlLoginPage } from "../pages/HudlLoginPage";
import { LandingPage } from "../pages/LandingPage";

type Fixtures = {
  landingPage: LandingPage;
  hudlLoginPage: HudlLoginPage;
  hudlLoginData: { email: string; password: string };
};

export const test = base.extend<Fixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await landingPage.navigate();
    await use(landingPage);
  },

  hudlLoginPage: async ({ landingPage }, use) => {
    const hudlLoginPage = await landingPage.openHudlLoginPage();
    await use(hudlLoginPage);
  },

  hudlLoginData: async ({}, use) => {
    const email = process.env.HUDLEMAIL as string;
    const password = process.env.HUDLPASSWORD as string;

    if (!email) {
      throw new Error("Missing email in .env file.");
    } else if (!password) {
      throw new Error("Missing password in .env file.");
    }

    await use({ email: email, password: password });
  },
});

export { expect } from "@playwright/test";
