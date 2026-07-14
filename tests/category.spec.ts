import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';

test.describe('Тест кейс 3: Перегляд товарів за категорією із сортуванням', () => {
  test('категорія показує товари, сортування Z-A працює коректно', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    // Prerequisite: користувач на головній сторінці
    await homePage.goto();

    // Step 1: відкрити категорію "Hand Tools"
    await homePage.openCategory('hand-tools');

    // Expected (частина 1): товари належать саме до цієї категорії
    await expect(page).toHaveURL(/.*category\/hand-tools/);
    const title = await categoryPage.getTitleText();
    expect(title.toLowerCase()).toContain('hand tools');

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);

    // Step 2: сортування "Name (Z-A)"
    await categoryPage.sortBy('name,desc');

    // Step 3 / Expected (частина 2): назви відсортовані проти алфавітом
  
  const names = await categoryPage.getAllProductNames();
  const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sortedNames);
  
  });
});