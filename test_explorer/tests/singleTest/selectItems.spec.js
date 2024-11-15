// @ts-check
const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../../pageObjects/inventoryPage.spec');
const { login } = require('../../initialPage/login.spec');

test.beforeEach(async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce'); // Pass the `page` object explicitly
});

test.describe('Select Items', () => {
  test('Select 2 Items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitPageLoad();
    // Select items
    const items = await inventoryPage.selectItems(2);

    // Assertions
    const counter = await inventoryPage.cartCounter();
    expect(counter).toBe('2');
  });

  test('Select 3 Items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitPageLoad();
    // Select items
    const items = await inventoryPage.selectItems(3);

    // Assertions
    const counter = await inventoryPage.cartCounter();
    expect(counter).toBe('3');
  });

  test('Select 4 Items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitPageLoad();
    // Select items
    const items = await inventoryPage.selectItems(4);

    // Assertions
    const counter = await inventoryPage.cartCounter();
    expect(counter).toBe('4');
  });
});
