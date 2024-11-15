const { expect } = require('@playwright/test')

exports.LoginPage = class LoginPage {
  constructor (page) {
    this.page = page
    this.usernameInput = '#user-name'
    this.passwordInput = '#password'
    this.loginButton = '#login-button'
    this.titlePage = `//div[@class='login_logo']`
  }

  async waitPageLoad () {
    await expect(this.page.locator(this.titlePage)).toHaveText('Swag Labs')
  }

  async waitLoginFormLoad () {
    await expect(this.page.locator(this.usernameInput)).toBeVisible()
    await expect(this.page.locator(this.passwordInput)).toBeVisible()
    await expect(this.page.locator(this.loginButton)).toBeVisible()
  }

  async fillUsername (username) {
    await this.page.fill(this.usernameInput, username)
    return await this.page.inputValue(this.usernameInput);
  }

  async fillPassword (password) {
    await this.page.fill(this.passwordInput, password)
    return await this.page.inputValue(this.passwordInput);
  }

  async clickLogin () {
    await this.page.click(this.loginButton)
  }

  async login (pParams) {
    //wait for page and login form load
    await this.waitPageLoad()
    await this.waitLoginFormLoad()

    //fill login form
    await this.page.fill(this.usernameInput, pParams.username)
    await expect(this.page.locator(this.usernameInput)).toHaveValue(
      pParams.username
    )

    await this.page.fill(this.passwordInput, pParams.password)
    await expect(this.page.locator(this.passwordInput)).toHaveValue(
      pParams.password
    )

    //click login
    await this.page.click(this.loginButton)
  }
}
