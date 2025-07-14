import { Page } from "@playwright/test";

export abstract class BasePage {
  page: Page;
  baseUrl: string = "https://www.hudl.com";
  route: string = "";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${this.baseUrl}${this.route}`);
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
