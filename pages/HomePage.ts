import { Locator, Page } from "@playwright/test";

export class HomePage {
  loginButton: Locator;
  hudlLogin: Locator;
  wyscoutLogin: Locator;
  volleymetricsLogin: Locator;
  signalLogin: Locator;
  instatBasketballLogin: Locator;
  instatHockeyLogin: Locator;
  iqforAmericanFootballLogin: Locator;
  statsbombLogin: Locator;
  balltimeLogin: Locator;
  titanLogin: Locator;

  constructor(page: Page) {
    this.loginButton = page.getByTestId("login-select");
    this.hudlLogin = page.getByTestId("login-hudl");
    this.wyscoutLogin = page.getByTestId("login-wyscout");
    this.volleymetricsLogin = page.getByTestId("login-volleymetrics");
    this.signalLogin = page.getByTestId("login-signal");
    this.instatBasketballLogin = page.getByTestId("login-instatbasketball");
    this.instatHockeyLogin = page.getByTestId("login-instathockey");
    this.iqforAmericanFootballLogin = page.getByTestId("login-iq");
    this.statsbombLogin = page.getByTestId("login-statsbomb");
    this.balltimeLogin = page.getByTestId("login-balltime");
    this.titanLogin = page.getByTestId("login-titan");
  }
}
