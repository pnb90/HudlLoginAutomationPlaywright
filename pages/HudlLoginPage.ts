import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HudlLoginPage extends BasePage {
  emailInput: Locator;
  passwordInput: Locator;
  continueButton: Locator;
  createAccountLink: Locator;
  googleLoginButton: Locator;
  facebookLoginButton: Locator;
  appleLoginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator("input[inputmode='email']");
    this.passwordInput = this.page.locator("input#password");
    this.continueButton = this.page.getByRole("button", { name: "Continue", exact: true });
    this.createAccountLink = this.page.getByText("Create Account");
    this.googleLoginButton = this.page.locator('button[data-provider="google"]');
    this.facebookLoginButton = this.page.locator('button[data-provider="facebook"]');
    this.appleLoginButton = this.page.locator('button[data-provider="apple"]');
  }

  async loginViaEmail(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();

    await this.passwordInput.fill(password);
    await this.continueButton.click();
    await this.page.waitForURL('**/home')
}
}
