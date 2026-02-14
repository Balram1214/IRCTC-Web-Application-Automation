import { BasePage } from "./BasePage";

export class TrainSearchPage extends BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        super(page);
        this.FROM_STATION_LOCATOR = this.page.getByLabel("Enter From station");
        this.TO_STATION_LOCATOR = this.page.getByLabel("Enter To station");
        this.ALERT_MODEL_LOCATOR = this.page.locator("//button[contains(@aria-label, 'Confirmation')]");
        this.STATION_SUGGESTION_LOCATOR = this.page.getByRole("listbox");
    }

    async navigateOnTheTrainSearchPage(baseUrl) {
        await this.navigateTo(baseUrl);
    }

    async acceptAlertModal() {
        try {
            await this.click(this.ALERT_MODEL_LOCATOR);
        } catch (Exception) {
            console.log('Alert modal is not visible and we are moving ahed...')
        }
    }

    async isFromStationVisibleAndEnabled() {

        const isFromStationVisible = await this.isVisible(this.FROM_STATION_LOCATOR);
        const isFromStationEnabled = await this.isEnabled(this.FROM_STATION_LOCATOR);

        return { isFromStationVisible, isFromStationEnabled }
    }

    async enterFromStation(cityName) {
        await this.FROM_STATION_LOCATOR.fill(cityName);
    }

    async getStationSuggestionCount() {
        await this.STATION_SUGGESTION_LOCATOR.first().waitForVisible;
        return await this.STATION_SUGGESTION_LOCATOR.count();
    }
}

