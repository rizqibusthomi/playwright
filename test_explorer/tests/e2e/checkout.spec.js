// @ts-check
const { test, expect } = require('@playwright/test')
const { InventoryPage } = require('../../pageObjects/inventoryPage.spec')
const { login } = require('../../initialPage/login.spec')
const { CartPage } = require('../../pageObjects/cartPage.spec')
const {
  YourInformationPage
} = require('../../pageObjects/yourInformationPage.spec')
const { OverviewPage } = require('../../pageObjects/overViewPage.spec')

test('checkout', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce') // Pass the `page` object explicitly

  //invetory page
  const inventoryPage = new InventoryPage(page)
  await inventoryPage.waitPageLoad()

  const count = 2

  // Select randoms items
  let itemNames = await inventoryPage.selectMultipleRandomItems(count)
  console.log('inventory item names:', itemNames)

  // Assertions
  const counterCartInventoryPage = await inventoryPage.cartCounter()
  expect(counterCartInventoryPage).toBe(count.toString())

  //cart page
  await inventoryPage.goToCart()

  const cartPage = new CartPage(page)
  await cartPage.waitPageLoad()

  //validate item names
  let cartItemNames = await cartPage.getItemName()
  console.log('cart item names:', cartItemNames)
  expect(cartItemNames).toEqual(itemNames)

  //remove an item
  await cartPage.removeItem(1)

  //validate item names
  let afterRemoveItemName = await cartPage.getItemName()
  console.log('item name after remove an item:', afterRemoveItemName)
  expect(afterRemoveItemName).not.toContain(itemNames[1])

  // Assert item removed
  const counterCartPage = await cartPage.cartCounter()
  expect(counterCartPage).toBe((count - 1).toString())

  //checkout page
  await cartPage.checkout()

  const yourInformationPage = new YourInformationPage(page)
  await yourInformationPage.waitPageLoad()

  //fill checkout form
  const pParams = {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '12345'
  }
  const firstName = await yourInformationPage.fillFirstName(pParams.firstName)
  expect(firstName).toBe(pParams.firstName)

  const lastName = await yourInformationPage.fillLastName(pParams.lastName)
  expect(lastName).toBe(pParams.lastName)

  const postalCode = await yourInformationPage.fillPostalCode(
    pParams.postalCode
  )
  expect(postalCode).toBe(pParams.postalCode)

  //overview page
  await yourInformationPage.continue()

  const overviewPage = new OverviewPage(page)
  await overviewPage.waitPageLoad()

  //validate item names
  let overviewItemNames = await overviewPage.getItemName()
  console.log('overview item names:', overviewItemNames)
  expect(overviewItemNames).toEqual(afterRemoveItemName)

  //validate cart counter
  const counterOverviewPage = await overviewPage.cartCounter()
  expect(counterOverviewPage).toBe((count - 1).toString())

  //finish checkout
  await overviewPage.finishCheckout()
})
