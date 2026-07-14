import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly categoriesMenuButton: Locator;
  readonly categoryLink: (categorySlug: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoriesMenuButton = page.locator('[data-test="nav-categories"]');
    this.categoryLink = (categorySlug: string) =>
      page.locator(`[data-test="nav-${categorySlug}"]`);
  }

  async goto() {
    await this.page.goto('/');
  }

  async openCategory(categorySlug: string) {
    await this.categoriesMenuButton.click();
    await this.categoryLink(categorySlug).click();
  }
}