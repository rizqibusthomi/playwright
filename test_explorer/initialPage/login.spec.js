const { expect } = require('@playwright/test')

exports.login = async function login (page, username, password) {
  await page.goto('https://www.saucedemo.com/')
  await page.fill('#user-name', username)
  await page.fill('#password', password)
  await page.click('#login-button')

  // Assertion
  await expect(page).toHaveURL(/inventory/)
}
