import { test } from "../fixtures";
import { PaymentOption } from "../pages/checkout-steps/payment";

test(
  "Verify user can order the product",
  {
    tag: "@regression",
  },
  async ({ loggedInApp }) => {
    await test.step("Open Home page", async () => {
      await loggedInApp.homePage.open();
    });

    await test.step("Open first product", async () => {
      await loggedInApp.homePage.openFirstProduct();
    });

    await test.step("Add product to cart", async () => {
      await loggedInApp.productPage.addProductToCart();
    });

    const productName = await loggedInApp.productPage.getName();
    const productPrice = await loggedInApp.productPage.getPrice();

    await test.step("Open checkout page", async () => {
      await loggedInApp.checkoutPage.open();
      await loggedInApp.checkoutPage.cartStep.checkProductName(productName);
      await loggedInApp.checkoutPage.cartStep.checkProductPrice(productPrice);
    });

    await test.step("Proceed next step", async () => {
      await loggedInApp.checkoutPage.cartStep.proceedCheckout();
      await loggedInApp.checkoutPage.signInStep.checkUserLoggedText();
    });

    await test.step("Proceed next step", async () => {
      await loggedInApp.checkoutPage.signInStep.proceedCheckout();
    });

    await test.step("Set billing address data", async () => {
      await loggedInApp.checkoutPage.billingAddressStep.inputRequiredFields(
        "any",
        "1234",
      );
    });

    await test.step("Proceed next step", async () => {
      await loggedInApp.checkoutPage.billingAddressStep.proceedCheckout();
    });

    await test.step(`Select payment method: ${PaymentOption.CREDIT_CARD}`, async () => {
      await loggedInApp.checkoutPage.paymentStep.selectPaymentMethod(
        PaymentOption.CREDIT_CARD,
      );
    });

    await test.step("Set credit card data", async () => {
      await loggedInApp.checkoutPage.paymentStep.creditCardMethod.inputRequiredFields(
        "1111-1111-1111-1111",
        "111",
        process.env.USER_NAME,
      );
    });

    await test.step("Confirm", async () => {
      await loggedInApp.checkoutPage.paymentStep.creditCardMethod.confirm();
      await loggedInApp.checkoutPage.paymentStep.creditCardMethod.checkPaymentSuccessMessage();
    });
  },
);
