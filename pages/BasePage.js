export class BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        this.page = page;
    }

    // ==================================================
    // Navigation Methods
    // ==================================================

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async refresh() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }

    // ==================================================
    // Click & Mouse Actions
    // ==================================================

    async click(locator) {
        await this.page.locator(locator).click();
    }

    async doubleClick(locator) {
        await this.page.locator(locator).dblclick();
    }

    async hover(locator) {
        await this.page.locator(locator).hover();
    }

    // ==================================================
    // Input Actions
    // ==================================================

    async enterValueInto(locator, value) {
        await this.page.locator(locator).fill(value);
    }

    async enterValueSlowerInto(locator, value) {
        await this.page.locator(locator).pressSequentially(value);
    }

    async selectByValue(locator, value) {
        await this.page.locator(locator).selectOption(value);
    }

    async selectByLabel(locator, label) {
        await this.page.locator(locator).selectOption({ label });
    }

    // ==================================================
    // State Verification Methods
    // ==================================================

    async isVisible(locator) {
        return await this.page.locator(locator).isVisible();
    }

    async isChecked(locator) {
        return await this.page.locator(locator).isChecked();
    }

    async isEnabled(locator) {
        return await this.page.locator(locator).isEnabled();
    }

    // ==================================================
    // Text / Data Retrieval
    // ==================================================

    async getText(locator) {
        return await this.page.locator(locator).textContent();
    }

    async getAllTexts(locator) {
        return await this.page.locator(locator).allTextContents();
    }

    // ==================================================
    // Scroll Methods
    // ==================================================

    async scrollIntoView(locator) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
    }

    async scrollToBottom() {
        await this.page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
    }

    async scrollToTop() {
        await this.page.evaluate(() =>
            window.scrollTo(0, 0)
        );
    }

    // ==================================================
    // Explicit Wait Methods (Use Only When Needed)
    // ==================================================

    async waitForVisible(locator) {
        await this.page.locator(locator).waitFor({ state: 'visible' });
    }

    async waitForHidden(locator) {
        await this.page.locator(locator).waitFor({ state: 'hidden' });
    }

}