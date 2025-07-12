import { Locator, Page } from "@playwright/test";

export class HudlHomePage {
  globalNavBar: Locator;

  constructor(page: Page) {
    // this test id has a typo
    this.globalNavBar = page.getByTestId("gloabl-navbar");
  }
}
