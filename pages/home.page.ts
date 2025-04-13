import { Page, Locator, expect } from "@playwright/test";
import {
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

  async verifyProductsOnPageSorted(sortOption: SortOption) {
    const sortedProducts: string[] | number[] =
      await this.getAllProductsOnPage();
    switch (sortOption) {
      case SortOption.BY_NAME_IN_ASC:
        expect(sortedProducts).toEqual(
          sortedProducts.toSorted((a, b) => a.localeCompare(b))
        );
        break;
      case SortOption.BY_NAME_IN_DESC:
        expect(sortedProducts).toEqual(
          sortedProducts.toSorted((a, b) => b.localeCompare(a))
        );
        break;
      case SortOption.BY_PRICE_IN_ASC:
        expect(sortedProducts).toEqual(
          sortedProducts.toSorted((a, b) => a - b)
        );
        break;
      case SortOption.BY_PRICE_IN_DESC:
        expect(sortedProducts).toEqual(
          sortedProducts.toSorted((a, b) => b - a)
        );
        break;
      default:
        throw new Error("Can not find sorting option");
    }
  }
}
