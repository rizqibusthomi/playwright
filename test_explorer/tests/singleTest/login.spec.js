// @ts-check
const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../../pageObjects/loginPage.spec')

test('Login Test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginPage = new LoginPage(page)
  await loginPage.waitPageLoad()
  await loginPage.waitLoginFormLoad()

  const pParams = {
    username: 'standard_user',
    password: 'secret_sauce'
  }

  const username = await loginPage.fillUsername(pParams.username)
  expect(username).toBe(pParams.username)
  const password = await loginPage.fillPassword(pParams.password)
  expect(password).toBe(pParams.password)
  await loginPage.clickLogin()

  // Assertion
  await expect(page).toHaveURL(/inventory/)
})
