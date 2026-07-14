import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productNames: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="page-title"]');
    this.productNames = page.locator('[data-test="product-name"]');
    this.sortDropdown = page.locator('[data-test="sort"]');
  }

  async getProductCount(): Promise<number> {
    await expect(async () => {
        const count = await this.productNames.count();
        const noResultsVisible = await this.page.locator('[data-test="category-empty"]').isVisible().catch(() => false);
        
        if (count === 0 && !noResultsVisible) {
        throw new Error('Товари ще не завантажились');
        }
    }).toPass({ timeout: 15000, intervals: [300, 500, 1000] });

    return await this.productNames.count();
}

  async getTitleText(): Promise<string> {
    return (await this.pageTitle.textContent())?.trim() ?? '';
  }

  async sortBy(sortValue: string) {
    const firstNameBefore = await this.productNames.first().textContent();

    await this.sortDropdown.selectOption(sortValue);

    await expect(async () => {
        const firstNameAfter = await this.productNames.first().textContent();
        expect(firstNameAfter).not.toBe(firstNameBefore);
    }).toPass({ timeout: 5000 });
}

  async getAllProductNames(): Promise<string[]> {
    const rawNames = await this.productNames.allTextContents();
    return rawNames.map((name) => name.trim());
  }
}