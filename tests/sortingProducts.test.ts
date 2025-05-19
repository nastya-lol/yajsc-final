import { test } from "../fixtures";
import { SortOption } from "../pages/fragments/product-filter.fragment";

[
  { sortOption: SortOption.BY_NAME_IN_ASC },
  { sortOption: SortOption.BY_NAME_IN_DESC },
  { sortOption: SortOption.BY_PRICE_IN_ASC },
  { sortOption: SortOption.BY_PRICE_IN_DESC },
].forEach(({ sortOption }) => {
  test(
    `Verify user can perform sorting by name or price in ${sortOption}`,
    {
      tag: "@smoke",
    },
    async ({ app }) => {
      await test.step("Open Home page", async () => {
        await app.homePage.open();
      });

      await test.step(`Filter products by ${sortOption}`, async () => {
        await app.homePage.productFilter.sortProducts(sortOption);
        await app.homePage.verifyProductsSorted(sortOption);
      });
    },
  );
});
