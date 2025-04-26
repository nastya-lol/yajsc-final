import { Page, Locator, expect } from "@playwright/test";
import { CreditCardPaymentFragment } from "./fragments/payment.fragment";

export class CheckoutPage {
  readonly path: string = "/checkout";
  readonly cartStep: CartStep = new CartStep(this.page);
  readonly signInStep: SignInStep = new SignInStep(this.page);
  readonly billingAddressStep: BillingAddressStep = new BillingAddressStep(
    this.page,
  );
  readonly paymentStep: PaymentStep = new PaymentStep(this.page);

  constructor(protected page: Page) {}

  async open() {
    await this.page.goto(this.path);
  }
}

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
