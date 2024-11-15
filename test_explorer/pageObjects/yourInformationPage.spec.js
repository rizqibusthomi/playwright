const { expect } = require('@playwright/test');

exports.YourInformationPage = class YourInformationPage {
    constructor(page) {
        this.page = page;
        this.titlePage = '//span[@class="title"]';
        this.firstNameInput = '//input[@data-test="firstName"]';
        this.lastNameInput = '//input[@data-test="lastName"]';
        this.postalCodeInput = '//input[@data-test="postalCode"]';
        this.continueButton = '//input[@data-test="continue"]';
    }

    async waitPageLoad() {
        await expect(this.page.locator(this.titlePage)).toBeVisible();
    }

    async fillFirstName (firstName) {
        await this.page.fill(this.firstNameInput, firstName);
        return await this.page.inputValue(this.firstNameInput);
    }

    async fillLastName (lastName) {
        await this.page.fill(this.lastNameInput, lastName);
        return await this.page.inputValue(this.lastNameInput);
    }


    async fillPostalCode (postalCode) {
        await this.page.fill(this.postalCodeInput, postalCode);
        return await this.page.inputValue(this.postalCodeInput);
    }

    async continue() {
        await this.page.locator(this.continueButton).click();
    }
}