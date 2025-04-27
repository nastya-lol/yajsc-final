import { Page, Locator } from "@playwright/test";
import { CreditCardPaymentFragment } from "../fragments/payment.fragment";

export enum PaymentOption {
  CREDIT_CARD = "credit-card",
}

export class PaymentStep {
  readonly paymentMethodDropdown: Locator =
    this.page.getByTestId("payment-method");
  readonly creditCardMethod = new CreditCardPaymentFragment(this.page);

  constructor(protected page: Page) {}

  async selectPaymentMethod(option: PaymentOption) {
    await this.paymentMethodDropdown.selectOption(option);
  }
}
