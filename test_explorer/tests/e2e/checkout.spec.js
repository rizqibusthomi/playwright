// @ts-check
const { test, expect } = require('@playwright/test')
const { InventoryPage } = require('../../pageObjects/inventoryPage.spec')
const { login } = require('../../initialPage/login.spec')

test.describe('Select Items', () => {
  test('login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce') // Pass the `page` object explicitly
  })

  test('Select random items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.waitPageLoad()
    
    const count = 2

    // Select randoms items
    const items = await inventoryPage.selectMultipleRandomItems(count)

    // Assertions
    const counter = await inventoryPage.cartCounter()
    expect(counter).toBe(count.toString())
  })
})
