import { Page } from "@playwright/test";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url ? url : "https://www.hudl.com/");
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
