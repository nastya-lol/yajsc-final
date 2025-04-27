import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { PaymentOption } from "../pages/checkout-steps/payment";

test("Verify user can order the product", async ({
  loginApp,
  homePage,
  productPage,
  checkoutPage,
  accountPage,
  page,
}) => {
  await expect(page).toHaveURL(accountPage.path);
  await homePage.open();
  await homePage.openFirstProduct();
  await productPage.addProductToCart();
  const productName = await productPage.getName();
  const productPrice = await productPage.getPrice();

  await checkoutPage.open();
  await checkoutPage.cartStep.checkProductName(productName);
  await checkoutPage.cartStep.checkProductPrice(productPrice);
  await checkoutPage.cartStep.proceedCheckout();

  await checkoutPage.signInStep.checkUserLoggedText();
  await checkoutPage.signInStep.proceedCheckout();

  await checkoutPage.billingAddressStep.inputRequiredFields("any", "1234");
  await checkoutPage.billingAddressStep.proceedCheckout();

  await checkoutPage.paymentStep.selectPaymentMethod(PaymentOption.CREDIT_CARD);
  await checkoutPage.paymentStep.creditCardMethod.inputRequiredFields(
    "1111-1111-1111-1111",
    "111",
    process.env.USER_NAME,
  );
  await checkoutPage.paymentStep.creditCardMethod.confirm();
  await checkoutPage.paymentStep.creditCardMethod.checkPaymentSuccessMessage();
});
