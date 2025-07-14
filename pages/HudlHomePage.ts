import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HudlHomePage extends BasePage {
  globalNavBar: Locator;
  route = "/home";

  constructor(page: Page) {
    super(page);
    // this test id has a typo
    this.globalNavBar = page.getByTestId("gloabl-navbar");
  }
}
