import { Page, Locator } from "@playwright/test";
import { HeaderFragment } from "./fragments/header.fragment";

export class ProductPage {
  readonly path: string = "/product";
  readonly productName: Locator = this.page.getByTestId("product-name");
  readonly price: Locator = this.page.getByTestId("unit-price");
  readonly addToCartButton: Locator = this.page.getByTestId("add-to-cart");
  readonly addToFavoritesButton: Locator =
    this.page.getByTestId("add-to-favorites");
  readonly addedToCartAlert: Locator = this.page.getByRole("alert", {
    name: "Product added to shopping",
  });
  readonly header: HeaderFragment = new HeaderFragment(this.page);

  constructor(protected page: Page) {}

  async open() {
    await this.page.goto(this.path);
  }
  async addToCart() {
    await this.addToCartButton.click();
  }

  async waitForAlertToDisappear() {
    await this.page.waitForSelector("alert", {
      state: "detached",
      timeout: 8000,
    });
  }
  async getName(): Promise<string> {
    return this.productName.textContent();
  }
  async getPrice(): Promise<string> {
    return this.price.textContent();
  }

  async addProductToCart() {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes("carts") &&
        response.status() === 200 &&
        response.request().method() === "POST",
    );
    await this.addToCart();
    await responsePromise;
  }
}
