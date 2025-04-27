import { Page, Locator, expect } from "@playwright/test";

export class SignInStep {
  readonly checkOutProceedButton: Locator = this.page.getByTestId("proceed-2");
  readonly loginForm: Locator = this.page.locator("app-login");

  constructor(protected page: Page) {}

  async proceedCheckout() {
    await this.checkOutProceedButton.click();
  }

  async checkUserLoggedText() {
    await expect(this.loginForm).toContainText(
      `Hello ${process.env.USER_NAME}, you are already logged in. You can proceed to checkout.`,
    );
  }
}
