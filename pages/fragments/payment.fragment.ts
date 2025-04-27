import { expect, Page } from "@playwright/test";

export class CreditCardPaymentFragment {
  readonly cardNumberInput: Locator =
    this.page.getByTestId("credit_card_number");
  readonly expirationDateInput: Locator =
    this.page.getByTestId("expiration_date");
  readonly cvvInput: Locator = this.page.getByTestId("cvv");
  readonly cardHolderNameInput: Locator =
    this.page.getByTestId("card_holder_name");
  readonly paymentSuccessMessage: Locator = this.page.getByTestId(
    "payment-success-message",
  );
  readonly confirmButton: Locator = this.page.getByTestId("finish");

  constructor(protected page: Page) {}

  async inputRequiredFields(
    cardNumber: string,
    cvvInput: string,
    cardHolderName: string,
  ) {
    const date = new Date(Date.now());
    date.setUTCMonth(date.getUTCMonth() + 3);
    const expirationDate = `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date.getUTCFullYear()}`;
    await this.cardNumberInput.fill(cardNumber);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvvInput);
    await this.cardHolderNameInput.fill(cardHolderName);
  }

  async confirm() {
    await this.confirmButton.click();
  }

  async checkPaymentSuccessMessage() {
    await expect(this.paymentSuccessMessage).toHaveText(
      "Payment was successful",
    );
  }
}
