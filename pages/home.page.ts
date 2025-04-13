import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly path: string = "/";

  constructor(protected page: Page) {}

  async open() {
    await this.page.goto(this.path);
  }

  async openProduct(productName: string) {
    await this.page.getByText(productName).click();
  }
}
