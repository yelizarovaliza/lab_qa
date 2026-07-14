import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly quantityInput: Locator;
  readonly unitPrice: Locator;
  readonly lineTotal: Locator;
  readonly cartTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.quantityInput = page.locator('[data-test="product-quantity"]').first();
    this.unitPrice = page.locator('[data-test="product-price"]').first();
    this.lineTotal = page.locator('[data-test="line-price"]').first();
    this.cartTotal = page.locator('[data-test="cart-total"]');
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async openViaIcon() {
    await this.cartIcon.click();
  }

    async setQuantity(value: number) {
    await this.quantityInput.fill(String(value));
    await this.quantityInput.blur();
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  async getUnitPrice(): Promise<number> {
    const text = await this.unitPrice.textContent();
    return parseFloat(text!.replace(/[^0-9.]/g, ''));
  }

  async getLineTotal(): Promise<number> {
    const text = await this.lineTotal.textContent();
    return parseFloat(text!.replace(/[^0-9.]/g, ''));
  }
  async getCartTotal(): Promise<number> {
    const text = await this.cartTotal.textContent();
    return parseFloat(text!.replace(/[^0-9.]/g, ''));
  }
}