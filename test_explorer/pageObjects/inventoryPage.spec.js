const { expect } = require('@playwright/test')

exports.InventoryPage = class InventoryPage {
  constructor (page) {
    this.page = page
    this.cards = '//div[@class="inventory_item"]'
    this.cartIcon = '//a[@class="shopping_cart_link"]'
    this.cartCounterElement = '//span[@data-test="shopping-cart-badge"]'
    this.titlePage = '//span[@class="title"]'
  }

  async waitPageLoad () {
    await expect(this.page.locator(this.titlePage)).toBeVisible()
  }

  async selectItems (count) {
    const items = this.page.locator(this.cards)
    const totalItems = await items.count()

    expect(totalItems).toBeGreaterThanOrEqual(count)

    for (let i = 0; i < count; i++) {
      const addToCartButton = items.nth(i).locator('//button')
      await addToCartButton.click()
    }
  }

  async selectRandomItems (previousSelections = []) {
    const items = this.page.locator(this.cards);
    const totalItems = await items.count();
  
    // Ensure the random index is not already in the previously selected items
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalItems);
    } while (previousSelections.includes(randomIndex));
  
    // Mark the item as selected
    previousSelections.push(randomIndex);
  
    const addToCartButton = items.nth(randomIndex).locator('//button[text()="Add to cart"]');
    await addToCartButton.click();
  
    // Return the name of the selected item
    return items
      .nth(randomIndex)
      .locator('//div[@data-test="inventory-item-name"]')
      .textContent();
  }
  

  async selectMultipleRandomItems (count) {
    const selectedItems = []
    for (let i = 0; i < count; i++) {
      const itemName = await this.selectRandomItems()
      selectedItems.push(itemName) // Store the name of the selected item
    }
    return selectedItems
  }
  async cartCounter () {
    const counter = await this.page.locator(this.cartCounterElement)
    if (await counter.isVisible()) {
      return await counter.textContent()
    }
    return '0'
  }

  async goToCart () {
    await this.page.locator(this.cartIcon).click()
  }
}
