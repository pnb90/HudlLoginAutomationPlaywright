import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HudlHomePage } from "./HudlHomePage";

export class HudlLoginPage extends BasePage {
  loginForm: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  continueButton: Locator;
  editEmailButton: Locator;
  invalidEmailError: Locator;
  incorrectPasswordError: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = this.page.locator('form[class*="_form-login"]');
    this.emailInput = this.loginForm.locator("input[inputmode='email']");
    this.passwordInput = this.loginForm.locator("input#password");
    this.continueButton = this.loginForm.getByRole("button", { name: "Continue", exact: true });
    this.editEmailButton = this.loginForm.locator('a[data-link-name="edit-username"]');
    this.invalidEmailError = this.page.locator("span#error-element-username");
    this.incorrectPasswordError = this.page.locator("span#error-element-password");
  }

  async loginViaEmail(email: string, password: string): Promise<HudlHomePage> {
    await this.enterInEmail(email);
    await this.enterInPassword(password);

    const hudlHomePage = new HudlHomePage(this.page);
    await hudlHomePage.waitForLoad();

    return hudlHomePage;
  }

  async enterInEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async enterInPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }

  async clickEditEmailButton(): Promise<void> {
    await this.editEmailButton.click();
  }
}
