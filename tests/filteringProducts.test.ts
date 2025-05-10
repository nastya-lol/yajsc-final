import { PowerToolsCategories } from "../pages/fragments/product-filter.fragment";
import { test } from "../fixtures";

test(`Verify user can filter products by category`, async ({ app }) => {
  await test.step("Open Home page", async () => {
    await app.homePage.open();
  });

  await test.step(`Filter products by ${PowerToolsCategories.SANDER}`, async () => {
    await app.homePage.productFilter.filterProducts(
      PowerToolsCategories.SANDER,
    );
    await app.homePage.verifyProductsFiltered(PowerToolsCategories.SANDER);
  });
});
