const { expect } = require('@playwright/test')

exports.OverviewPage = class OverviewPage {
  constructor (page) {
    this.page = page
    this.finishButton = '//button[@id="finish"]'
    this.titlePage = '//span[@class="title"]'
    this.cartItems = '//div[@data-test="inventory-item"]'
    this.itemPrice = '//div[@data-test="inventory-item-price"]'
    this.cartCounterElement = '//span[@data-test="shopping-cart-badge"]'
    this.finishButton = '//button[@data-test="finish"]'
  }

  async waitPageLoad () {
    await expect(this.page.locator(this.titlePage)).toBeVisible()
  }

  async getItemName () {
    const items = this.page.locator(this.cartItems) // Locator for cart items
    const totalItems = await items.count() // Get the total number of items
    console.log('total items:', totalItems)

    const listItemName = [] // Array to store item names

    // Loop through all items and get their names
    for (let i = 0; i < totalItems; i++) {
      const itemName = await items
        .nth(i)
        .locator('//div[@class="inventory_item_name"]')
        .textContent() // Get the name of each item
      listItemName.push(itemName) // Add the item name to the list
    }

    return listItemName // Return the list of item names
  }

  async cartCounter () {
    return this.page.locator(this.cartCounterElement).textContent()
  }

  async finishCheckout () {
    return this.page.locator(this.finishButton).click()
  }
}
