const { expect } = require('@playwright/test')

exports.CartPage = class CartPage {
  constructor (page) {
    this.page = page
    this.cartItems = '//div[@data-test="inventory-item"]'
    this.titlePage = '//span[@class="title"]'
    this.cartCounterElement = '//span[@data-test="shopping-cart-badge"]'
    this.checkoutButton = '//button[@data-test="checkout"]'
  }

  async waitPageLoad () {
    await expect(this.page.locator(this.titlePage)).toBeVisible()
  }

  async countItems () {
    return await this.page.locator(this.cartItems).count()
  }

  async removeItem (index) {
    const removeButton = this.page
      .locator(this.cartItems)
      .nth(index)
      .locator('//button')
    await removeButton.click()
  }

  async cartCounter () {
    return await this.page.locator(this.cartCounterElement).textContent()
  }

  async checkout () {
    await this.page.locator('//button[@id="checkout"]').click()
  }

  async getItemName() {
    const items = this.page.locator(this.cartItems); // Locator for cart items
    const totalItems = await items.count(); // Get the total number of items
    console.log('total items:', totalItems);
  
    const listItemName = []; // Array to store item names
  
    // Loop through all items and get their names
    for (let i = 0; i < totalItems; i++) {
      const itemName = await items.nth(i).locator('//div[@class="inventory_item_name"]').textContent(); // Get the name of each item
      listItemName.push(itemName); // Add the item name to the list
    }
  
    return listItemName; // Return the list of item names
  }
  
}
