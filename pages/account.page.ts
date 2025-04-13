import { Page, Locator } from "@playwright/test";

export class AccountPage {
  readonly path: string = "/account";
  readonly title: Locator = this.page.getByTestId("page-title");
  readonly navMenu: Locator = this.page.getByTestId("nav-menu");

  constructor(protected page: Page) {}
}
