const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cards = '//div[@class="inventory_item"]';
    this.cartIcon = '//a[@class="shopping_cart_link"]';
    this.cartCounterElement = '//span[@class="shopping_cart_badge"]';
    this.titlePage = '//span[@class="title"]';
  }

  async waitPageLoad() {
    await expect(this.page.locator(this.titlePage)).toBeVisible();
  }

  async selectItems(count) {
    const items = this.page.locator(this.cards);
    const totalItems = await items.count();

    expect(totalItems).toBeGreaterThanOrEqual(count);

    for (let i = 0; i < count; i++) {
      const addToCartButton = items.nth(i).locator('//button');
      await addToCartButton.click();
    }
  }

  async selectRandomItems(){
    const items = this.page.locator(this.cards);
    const totalItems = await items.count();
    const randomIndex = Math.floor(Math.random() * totalItems);
    const addToCartButton = items.nth(randomIndex).locator('//button');
    await addToCartButton.click();
  }

  async selectMultipleRandomItems(count) {
    for (let i = 0; i < count; i++) {
      await this.selectRandomItems();
    }
  }
  async cartCounter() {
    const counter = await this.page.locator(this.cartCounterElement);
    if (await counter.isVisible()) {
      return await counter.textContent();
    }
    return '0';
  }



  
  async goToCart() {
    await this.page.locator(this.cartIcon).click();
  }
};
