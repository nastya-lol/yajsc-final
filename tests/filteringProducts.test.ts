import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import {PowerToolsCategories} from "../pages/fragments/product-filter.fragment";

test(`Verify user can filter products by category`, async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await home.productFilter.filterProducts(PowerToolsCategories.SANDER);
  await home.verifyProductsFiltered(PowerToolsCategories.SANDER);
});
