import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("Verify login with valid credentials", async ({ app, page }) => {
  await app.loginPage.open();
  await app.loginPage.doLogin();
  await expect(page).toHaveURL(app.accountPage.path);
  await expect(app.accountPage.title).toContainText("My account");
  await expect(app.accountPage.navMenu).toContainText(process.env.USER_NAME);
});

test("Verify user can view product details", async ({ app, page }) => {
  const productName = "Combination Pliers";

  await app.homePage.open();
  await app.homePage.openProduct(productName);
  await expect(page).toHaveURL(/product/);
  await expect(app.productPage.productName).toContainText(productName);
  await expect(app.productPage.price).toContainText("14.15");
  await expect(app.productPage.addToCartButton).toBeVisible();
  await expect(app.productPage.addToFavoritesButton).toBeVisible();
});

test("Verify user can add product to cart", async ({ app, page }) => {
  const productName = "Slip Joint Pliers";

  await app.homePage.open();
  await app.homePage.openProduct(productName);
  await expect(page).toHaveURL(/product/);
  await expect(app.productPage.productName).toContainText(productName);
  await expect(app.productPage.price).toContainText("9.17");
  await app.productPage.addToCart();
  await expect(app.productPage.addedToCartAlert).toBeVisible();
  await app.productPage.waitForAlertToDisappear();
  await expect(app.productPage.header.cartQuantity).toContainText("1");
  await app.productPage.header.openCheckout();
  await expect(page).toHaveURL(app.checkoutPage.path);
  await app.checkoutPage.cartStep.checkProductsInCheckoutList(1);
  await expect(app.checkoutPage.cartStep.productTitle).toContainText(
    productName,
  );
  await expect(app.checkoutPage.cartStep.checkOutProceedButton).toBeVisible();
});
