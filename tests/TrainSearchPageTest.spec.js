import { test, expect } from '@playwright/test';
import { TrainSearchPage } from '../pages/TrainSearchPage';

/** @type {TrainSearchPage} */
let trainSearchPage;

test.beforeEach('Train Search Functionality Test Cases', async ({ page }) => {
    trainSearchPage = new TrainSearchPage(page);
    await trainSearchPage.navigateOnTheTrainSearchPage('https://www.irctc.co.in/nget/train-search');
    await trainSearchPage.acceptAlertModal();
});

test('TC_01 Verify that the From Station field is visible and enabled.', async () => {
    const fromStationFieldStatus = await trainSearchPage.isFromStationVisibleAndEnabled();
    expect(fromStationFieldStatus.isFromStationVisible).toBeTruthy();
    expect(fromStationFieldStatus.isFromStationEnabled).toBeTruthy();
})

test('TC_02 Verify that station suggestions appear when the user enters a city name', async () => {
    await trainSearchPage.enterFromStation('Pune');
    const suggestionCpunt = await trainSearchPage.getStationSuggestionCount();
    expect(suggestionCpunt).toBeGreaterThan(0);
}

)

