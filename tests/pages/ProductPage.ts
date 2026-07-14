import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="nav-cart"]');
  }

  async goto(productId: string) {
    await this.page.goto(`/product/${productId}`);
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.cartBadge.waitFor({ state: 'visible' });
  }
}