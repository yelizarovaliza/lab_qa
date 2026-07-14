import { test, expect } from '@playwright/test';
import { ProductPage } from './tests/pages/ProductPage';
import { CartPage } from './tests/pages/CartPage';

test.describe('Тест кейс 4: Зміна кількості товару в кошику', () => {
  test('сума оновлюється відповідно до кількості', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Prerequisite: товар додано в кошик
    // await productPage.goto('01KXH3EJ3W07XJ36S8CJ1QJESR'); - молот тора можна взяти лише в кількості 1
    await productPage.goto('01KXH3EJ41GZRWYQSB4WV7G58G');
    await productPage.addToCart();

    await cartPage.openViaIcon();
    await expect(page).toHaveURL(/.*checkout/);

    const unitPrice = await cartPage.getUnitPrice();

    //збільшити кількість
    await cartPage.setQuantity(3);

    const quantity = await cartPage.getQuantity();
    const lineTotal = await cartPage.getLineTotal();
    const cartTotal = await cartPage.getCartTotal();

    await expect(async () => {
        const total = await cartPage.getCartTotal();
        expect(total).toBeCloseTo(unitPrice * 3, 2);
    }).toPass({ timeout: 5000 });

    // Expected Result: сума по рядку = кількість * ціна
    expect(lineTotal).toBeCloseTo(unitPrice * quantity, 2);

    // Оскільки в кошику лише один товар — загальна сума кошика має дорівнювати сумі по рядку
    expect(cartTotal).toBeCloseTo(lineTotal, 2);
  });
});