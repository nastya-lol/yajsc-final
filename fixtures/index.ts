import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { AccountPage } from "../pages/account.page";
import { App } from "../pages/app";

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  accountPage: AccountPage;
  loginApp: LoginPage;
  app: App;
  loggedInApp: App;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  loginApp: async ({ loginPage }, use) => {
    await loginPage.open();
    await loginPage.doLogin();
    await use(loginPage);
  },
  app: async ({ page }, use) => {
    await use(new App(page));
  },
  loggedInApp: async ({ doLogin, page }, use) => {
    await use(new App(page));
  },
});
