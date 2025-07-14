import { test as base } from "@playwright/test";
import { LandingPage, HudlLoginPage } from "../pages";

type Fixtures = {
  landingPage: LandingPage;
  hudlLoginPage: HudlLoginPage;
  hudlLoginData: { email: string; password: string };
};

export const test = base.extend<Fixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await landingPage.navigate(landingPage.pageUrl);
    await use(landingPage);
  },

  hudlLoginPage: async ({ landingPage, page }, use) => {
    const hudlLoginPage = new HudlLoginPage(page);
    await landingPage.openHudlLoginPage();
    await use(hudlLoginPage);
  },

  hudlLoginData: async ({}, use) => {
    await use({ email: process.env.HUDLEMAIL as string, password: process.env.HUDLPASSWORD as string });
  },
});

export { expect } from "@playwright/test";
