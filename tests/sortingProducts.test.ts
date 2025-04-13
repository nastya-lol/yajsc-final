import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import {
  PowerToolsCategories,
  SortOption,
} from "../pages/fragments/product-filter.fragment";

[
  { sortOption: SortOption.BY_NAME_IN_ASC },
  { sortOption: SortOption.BY_NAME_IN_DESC },
  { sortOption: SortOption.BY_PRICE_IN_ASC },
  { sortOption: SortOption.BY_PRICE_IN_DESC },
].forEach(({ sortOption }) => {
  test(`Verify user can perform sorting by name or price in ${sortOption}`, async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    await home.productFilter.sortProducts(sortOption);
    await home.verifyProductsOnPageSorted(sortOption);
  });
});

test(`Verify user can filter products by category`, async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await home.productFilter.filterProducts(PowerToolsCategories.SANDER);
  await home.verifyProductsFiltered(PowerToolsCategories.SANDER);
});
