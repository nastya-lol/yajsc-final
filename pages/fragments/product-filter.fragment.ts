import { Page, Locator } from "@playwright/test";

export enum SortOption {
  BY_NAME_IN_ASC = "Name (A - Z)",
  BY_NAME_IN_DESC = "Name (Z - A)",
  BY_PRICE_IN_ASC = "Price (Low - High)",
  BY_PRICE_IN_DESC = "Price (High - Low)",
}

export enum HandToolsCategories {
  HAND_TOOLS = "Hand Tools",
  HAMMER = "Hammer",
  HAND_SAW = "Hand Saw",
  WRENCH = "Wrench",
  SCREWDRIVER = "Screwdriver",
  PLIERS = "Pliers",
  CHISELS = "Chisels",
  MEASURES = "Measures",
}

export enum PowerToolsCategories {
  POWER_TOOLS = "Power Tools",
  GRINDER = "Grinder",
  SANDER = "Sander",
  SAW = "Saw",
  DRILL = "Drill",
}

export class ProductFilterComponent {
  readonly sortDropdown: Locator = this.page.getByTestId("sort");

  constructor(protected page: Page) {}

  async sortProducts(sortBY: SortOption) {
    const responsePromise = this.waitForProductsToBeSorted();
    await this.selectSortOption(sortBY);
    await responsePromise;
  }

  async filterProducts(filterBY: PowerToolsCategories | HandToolsCategories) {
    const responsePromise = this.waitForProductsToBeFiltered();
    await this.page.getByLabel(filterBY).click();
    await responsePromise;
  }

  async selectSortOption(sortBY: SortOption) {
    switch (sortBY) {
      case SortOption.BY_NAME_IN_ASC:
        await this.sortDropdown.selectOption("name,asc");
        break;
      case SortOption.BY_NAME_IN_DESC:
        await this.sortDropdown.selectOption("name,desc");
        break;
      case SortOption.BY_PRICE_IN_ASC:
        await this.sortDropdown.selectOption("price,desc");
        break;
      case SortOption.BY_PRICE_IN_DESC:
        await this.sortDropdown.selectOption("price,asc");
        break;
      default:
        throw new Error("Can not find sorting option");
    }
  }

  async waitForProductsToBeSorted() {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes("/products?sort") &&
        response.status() === 200 &&
        response.request().method() === "GET"
    );
  }

  async waitForProductsToBeFiltered() {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes("/products?between") &&
        response.url().includes("by_category") &&
        response.status() === 200 &&
        response.request().method() === "GET"
    );
  }
}
