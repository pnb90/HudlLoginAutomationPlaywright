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
    await use({ email: process.env.HUDLEMAIL as string, password: process.env.HUDLPASSWORD as string });
  },
});

export { expect } from "@playwright/test";
