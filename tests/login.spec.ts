import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { Page } from '@playwright/test';

test.describe('Тест кейс 1: Логін з правильними даними', () => {
  test('успішний логін перенаправляє на сторінку акаунту', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Prerequisites: користувач на головній сторінці
    await page.goto('/');

    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    

    // Expected Result: користувач залогінився, відкрилась сторінка акаунту
    await page.waitForURL(/.*account/, { timeout: 10000 });
    await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  });
});