import { test, expect } from "@playwright/test";

test("Mock tests", async ({ page }) => {
  await page.route(
    "https://api.practicesoftwaretesting.com/products*",
    async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      for (let i = 0; i < 11; i++) {
        json.data.push(json.data[i]);
      }
      json.per_page = 20;
      await route.fulfill({ response, json });
    },
  );
  await page.goto("https://practicesoftwaretesting.com/");
  expect(await page.getByTestId("product-name").count()).toBe(20);
});
