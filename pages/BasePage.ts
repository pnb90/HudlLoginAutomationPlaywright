import { Page } from "@playwright/test";

export abstract class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForUrl(url: string): Promise<void> {
    await this.page.waitForURL(url);
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForUrl(url);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
