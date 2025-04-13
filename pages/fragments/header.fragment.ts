import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
  readonly cartQuantity: Locator = this.page.getByTestId("cart-quantity");
  readonly navCartButton: Locator = this.page.getByTestId("nav-cart");

  constructor(protected page: Page) {}

  async openCart() {
    await this.navCartButton.click();
  }
}
