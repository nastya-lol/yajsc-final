import { test } from "../fixtures";
import { PaymentOption } from "../pages/checkout-steps/payment";

test("Verify user can order the product", async ({ loggedInApp }) => {
  await loggedInApp.homePage.open();
  await loggedInApp.homePage.openFirstProduct();
  await loggedInApp.productPage.addProductToCart();
  const productName = await loggedInApp.productPage.getName();
  const productPrice = await loggedInApp.productPage.getPrice();

  await loggedInApp.checkoutPage.open();
  await loggedInApp.checkoutPage.cartStep.checkProductName(productName);
  await loggedInApp.checkoutPage.cartStep.checkProductPrice(productPrice);
  await loggedInApp.checkoutPage.cartStep.proceedCheckout();

  await loggedInApp.checkoutPage.signInStep.checkUserLoggedText();
  await loggedInApp.checkoutPage.signInStep.proceedCheckout();

  await loggedInApp.checkoutPage.billingAddressStep.inputRequiredFields(
    "any",
    "1234"
  );
  await loggedInApp.checkoutPage.billingAddressStep.proceedCheckout();

  await loggedInApp.checkoutPage.paymentStep.selectPaymentMethod(
    PaymentOption.CREDIT_CARD
  );
  await loggedInApp.checkoutPage.paymentStep.creditCardMethod.inputRequiredFields(
    "1111-1111-1111-1111",
    "111",
    process.env.USER_NAME
  );
  await loggedInApp.checkoutPage.paymentStep.creditCardMethod.confirm();
  await loggedInApp.checkoutPage.paymentStep.creditCardMethod.checkPaymentSuccessMessage();
});
