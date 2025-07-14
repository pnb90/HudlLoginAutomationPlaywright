import { Page } from "@playwright/test";

export abstract class BasePage {
  page: Page;
  baseUrl: string = "https://www.hudl.com";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url?: string, route?: string): Promise<void> {
    let navigationUrl: string = this.baseUrl;

    if (route) {
      navigationUrl = this.baseUrl + route;
    } else if (url) {
      navigationUrl = url;
    }

    await this.page.goto(navigationUrl);
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
