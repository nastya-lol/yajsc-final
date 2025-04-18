import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { AccountPage } from "../pages/account.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";

test("Verify login with valid credentials", async ({ page }) => {
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  await login.open();
  await login.doLogin();
  await expect(page).toHaveURL(account.path);
  await expect(account.title).toContainText("My account");
  await expect(account.navMenu).toContainText(process.env.USER_NAME);
});

test("Verify user can view product details", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const productName = "Combination Pliers";

  await home.open();
  await home.openProduct(productName);
  expect(page).toHaveURL(/product/);
  await expect(product.productName).toContainText(productName);
  await expect(product.price).toContainText("14.15");
  await expect(product.addToCartButton).toBeVisible();
  await expect(product.addToFavoritesButton).toBeVisible();
});

test("Verify user can add product to cart", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  const productName = "Slip Joint Pliers";

  await home.open();
  await home.openProduct(productName);
  expect(page).toHaveURL(/product/);
  await expect(product.productName).toContainText(productName);
  await expect(product.price).toContainText("9.17");
  await product.addToCart();
  await expect(product.addedToCartAlert).toBeVisible();
  await product.waitForAlertToDisappear();
  await expect(product.header.cartQuantity).toContainText("1");
  await product.header.openCart();
  await expect(page).toHaveURL(checkout.path);
  await checkout.checkProductsInCheckoutList(1);
  await expect(checkout.productTitle).toContainText(productName);
  await expect(checkout.checkOutProceedButton).toBeVisible();
});
