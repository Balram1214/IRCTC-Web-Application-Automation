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

