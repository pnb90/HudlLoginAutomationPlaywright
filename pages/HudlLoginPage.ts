import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HudlLoginPage extends BasePage {
  loginForm: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  continueButton: Locator;
  createAccountLink: Locator;
  googleLoginButton: Locator;
  facebookLoginButton: Locator;
  appleLoginButton: Locator;
  invalidEmailError: Locator;
  incorrectPasswordError: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = this.page.locator('form[class*="_form-login"]');
    this.emailInput = this.loginForm.locator("input[inputmode='email']");
    this.passwordInput = this.loginForm.locator("input#password");
    this.continueButton = this.loginForm.getByRole("button", { name: "Continue", exact: true });
    this.createAccountLink = this.page.getByText("Create Account");
    this.googleLoginButton = this.page.locator('button[data-provider="google"]');
    this.facebookLoginButton = this.page.locator('button[data-provider="facebook"]');
    this.appleLoginButton = this.page.locator('button[data-provider="apple"]');
    this.invalidEmailError = this.page.locator("span#error-element-username");
    this.incorrectPasswordError = this.page.locator("span#error-element-password");
  }

  async loginViaEmail(email: string, password: string): Promise<void> {
    await this.enterInEmail(email);
    await this.enterInPassword(password);
    await this.page.waitForURL("**/home");
  }

  async enterInEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async enterInPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}
