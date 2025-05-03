import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("Do login setup", async ({ app, page }) => {
  await app.loginPage.open();
  await app.loginPage.doLogin();
  await expect(page).toHaveURL(app.accountPage.path);
  await expect(app.accountPage.title).toContainText("My account");
  await expect(app.accountPage.navMenu).toContainText(process.env.USER_NAME);
  await page.context().storageState({ path: ".auth/userSession.json" });
});
