import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HudlLoginPage } from "./HudlLoginPage";

export class LandingPage extends BasePage {
  loginButton: Locator;
  hudlLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.getByTestId("login-select");
    this.hudlLogin = page.getByTestId("login-hudl");
  }

  public async openHudlLoginPage(): Promise<HudlLoginPage> {
    await this.loginButton.click();
    await this.hudlLogin.click();

    return new HudlLoginPage(this.page);
  }
}
