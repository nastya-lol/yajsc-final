import { test, expect } from "@playwright/test";

test("Verify login with valid credentials", async ({ page }) => {
  await page.goto('/auth/login');
  await page.locator('[data-test="email"]').fill(process.env.USER_EMAIL);
  await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText("My account");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(process.env.USER_NAME);
});


test("Verify user can view product details", async ({ page }) => {
  await page.goto('/')
  await page.getByText('Combination Pliers').click();
  expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});

test("Verify user can add product to cart", async ({ page }) => {
  await page.goto('/')
  await page.getByText('Slip Joint Pliers').click();
  expect(page.url()).toContain('/product');
  await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible();
  await page.waitForSelector('alert', { state: 'detached', timeout: 8000 });
  await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page).toHaveURL('/checkout');
  await expect(page.locator('tbody').getByRole('row')).toHaveCount(1);
  await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
});
