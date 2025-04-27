import { Page, Locator } from "@playwright/test";

export class BillingAddressStep {
  readonly checkOutProceedButton: Locator = this.page.getByTestId("proceed-3");
  readonly stateInput: Locator = this.page.getByTestId("state");
  readonly postalCodeInput: Locator = this.page.getByTestId("postal_code");

  constructor(protected page: Page) {}

  async proceedCheckout() {
    await this.checkOutProceedButton.click();
  }
  async inputRequiredFields(state: string, postalCode: string) {
    await this.stateInput.fill(state);
    await this.postalCodeInput.fill(postalCode);
  }
}
