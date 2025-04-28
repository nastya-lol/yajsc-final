import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { AccountPage } from "../pages/account.page";

export class App {
  constructor(public page: Page) {}

  loginPage: LoginPage = new LoginPage(this.page);
  homePage: HomePage = new HomePage(this.page);
  productPage: ProductPage = new ProductPage(this.page);
  checkoutPage: CheckoutPage = new CheckoutPage(this.page);
  accountPage: AccountPage = new AccountPage(this.page);
}
