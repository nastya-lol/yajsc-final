import { PowerToolsCategories } from "../pages/fragments/product-filter.fragment";
import { test } from "../fixtures";

test(
  `Verify user can filter products by category`,
  {
    tag: "@smoke",
  },
  async ({ app }) => {
    await app.homePage.open();

    await app.homePage.productFilter.filterProducts(
      PowerToolsCategories.SANDER,
    );
    await app.homePage.verifyProductsFiltered(PowerToolsCategories.SANDER);
  },
);
