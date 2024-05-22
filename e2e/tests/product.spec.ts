import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Products CRUD', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  await page.getByRole('link', { name: 'Lista de produtos' }).click();

  await page.getByText('Adicionar').click()

  await expect(page.getByText('Criar produto')).toBeVisible()

  const product = {
    name: faker.commerce.productName(), 
    description: faker.commerce.productDescription(), 
    price: Number(faker.commerce.price()) 
  }

  await page.getByLabel('Nome').fill(product.name)

  await page.getByLabel('Descrição').fill(product.description)

  await page.getByLabel('Preço').fill(String(product.price))

  await page.getByRole('button', { name: 'Criar' }).click()

  await expect(page.locator('table')).toContainText(product.name)

  await page.locator('.view-button').first().click()

  await page.getByRole('button', { name: 'Deletar' }).click()

  await page.getByRole('button', { name: 'Deletar' }).last().click()

  await expect(page.getByText('Listagem de produtos')).toBeVisible()

  await page.locator('.delete-button').first().click()

  await page.getByRole('button', { name: 'Deletar' }).click()
});