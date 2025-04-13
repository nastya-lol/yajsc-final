import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly path: string = "/auth/login";
  readonly emailInput: Locator = this.page.getByTestId("email");
  readonly passwordInput: Locator = this.page.getByTestId("password");
  readonly submitButton: Locator = this.page.getByTestId("login-submit");

  constructor(public page: Page) {}

  async open() {
    await this.page.goto(this.path);
  }

  async doLogin() {
    await this.emailInput.fill(process.env.USER_EMAIL);
    await this.passwordInput.fill(process.env.USER_PASSWORD);
    await this.submitButton.click();
  }
}
