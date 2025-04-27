import { Page, Locator, expect } from "@playwright/test";

export class CartStep {
  readonly tableRows: Locator = this.page.locator("tbody").getByRole("row");
  readonly productTitle: Locator = this.page.getByTestId("product-title");
  readonly productPrice: Locator = this.page.getByTestId("product-price");
  readonly checkOutProceedButton: Locator = this.page.getByTestId("proceed-1");

  constructor(protected page: Page) {}

  async checkProductsInCheckoutList(productCount: number) {
    await expect(this.tableRows).toHaveCount(productCount);
  }

  async checkProductName(productName: string) {
    await expect(this.productTitle).toContainText(productName);
  }

  async checkProductPrice(productPrice: string) {
    await expect(this.productPrice).toContainText(productPrice);
  }

  async proceedCheckout() {
    await this.checkOutProceedButton.click();
  }
}
