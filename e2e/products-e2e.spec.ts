import { test, expect } from '@playwright/test';

test('Produtos', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByText('Product 1')).toBeVisible()
  
  await expect(page.getByText('Produtos')).toBeVisible()
});


