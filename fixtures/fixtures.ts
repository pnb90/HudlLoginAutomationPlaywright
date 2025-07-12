import { test as base } from "@playwright/test";
import { LandingPage, HudlLoginPage } from "../pages";

type Fixtures = {
  landingPage: LandingPage;
  hudlLoginPage: HudlLoginPage;
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
});

export { expect } from "@playwright/test";
