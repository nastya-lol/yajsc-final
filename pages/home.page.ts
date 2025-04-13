import { Page, Locator, expect } from "@playwright/test";
import {
  HandToolsCategories,
  PowerToolsCategories,
  ProductFilterComponent,
  SortOption,
} from "./fragments/product-filter.fragment";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  in_stock: boolean;
  product_image: any;
  category: any;
  brand: any;
}

interface ProductList {
  current_page: number;
  data: Product[];
}

export class HomePage {
  readonly path: string = "/";
  readonly productFilter = new ProductFilterComponent(this.page);

  readonly productsTitle: Locator = this.page.getByTestId("product-name");
  readonly productsPrice: Locator = this.page.getByTestId("product-price");
  readonly noProductsResult: Locator = this.page.getByTestId("no-results");

  constructor(protected page: Page) {}

  async open() {
    await this.page.goto(this.path);
  }

  async openProduct(productName: string) {
    await this.page.getByText(productName).click();
  }

  async getAllProductsOnPage(): Promise<string[]> {
    return await this.productsTitle.allTextContents();
  }

  async getAllProductsPricesOnPage(): Promise<number[]> {
    const prices = await this.productsPrice.allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  async verifyProductsFiltered(
    filterOption: HandToolsCategories | PowerToolsCategories
  ) {
    if (!(await this.noProductsResult.isVisible())) {
      const productsTitle = await this.getAllProductsOnPage();
      for (const product of productsTitle) {
        expect(product.trim()).toContain(filterOption);
      }
    } else console.log("There are no products found.");
  }

  async verifyProductsOnPageSorted(sortOption: SortOption) {
    const titleProducts: string[] = await this.getAllProductsOnPage();
    const priceProducts: number[] = await this.getAllProductsPricesOnPage();
    switch (sortOption) {
      case SortOption.BY_NAME_IN_ASC:
        expect(titleProducts).toEqual(
          titleProducts.toSorted((a, b) => a.localeCompare(b))
        );
        break;
      case SortOption.BY_NAME_IN_DESC:
        expect(titleProducts).toEqual(
          titleProducts.toSorted((a, b) => b.localeCompare(a))
        );
        break;
      case SortOption.BY_PRICE_IN_ASC:
        expect(priceProducts).toEqual(priceProducts.toSorted((a, b) => b - a));
        break;
      case SortOption.BY_PRICE_IN_DESC:
        expect(priceProducts).toEqual(priceProducts.toSorted((a, b) => a - b));
        break;
      default:
        throw new Error("Can not find sorting option");
    }
  }
}
