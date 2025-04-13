import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly path: string = "/checkout";
  readonly tableRows: Locator = this.page.locator("tbody").getByRole("row");
  readonly productTitle: Locator = this.page.getByTestId("product-title");
  readonly checkOutProceedButton: Locator = this.page.getByTestId("proceed-1");

  constructor(protected page: Page) {}

  async checkProductsInCheckoutList(productCount: number) {
    await expect(this.tableRows).toHaveCount(productCount);
  }
}
