import { Page } from "@playwright/test";
import { PaymentStep } from "./checkout-steps/payment";
import { SignInStep } from "./checkout-steps/signIn";
import { CartStep } from "./checkout-steps/cart";
import { BillingAddressStep } from "./checkout-steps/billingAddress";

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
