import { test as base } from "@playwright/test";
import { App } from "../pages/app";

type MyFixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
  loggedInApp: async ({ browser }, use) => {
    const page = await browser.newPage({
      storageState: ".auth/userSession.json",
    });
    await use(new App(page));
  },
});
