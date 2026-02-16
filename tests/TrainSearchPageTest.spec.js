import { test, expect } from '@playwright/test';
import { TrainSearchPage } from '../pages/TrainSearchPage';

/** @type {TrainSearchPage} */
let trainSearchPage;

test.beforeEach('Train Search Functionality Test Cases', async ({ page }) => {
    trainSearchPage = new TrainSearchPage(page);
    await trainSearchPage.navigateOnTheTrainSearchPage('https://www.irctc.co.in/nget/train-search');
    await page.waitForTimeout(3000);
    await trainSearchPage.acceptAlertModal();
});

test('TC_01 Verify that the From Station field is visible and enabled.', async () => {
    const fromStationFieldStatus = await trainSearchPage.isFromStationVisibleAndEnabled();
    expect(fromStationFieldStatus.isFromStationVisible).toBeTruthy();
    expect(fromStationFieldStatus.isFromStationEnabled).toBeTruthy();
})

test('TC_02 Verify that station suggestions appear when the user enters a city name', async () => {
    await trainSearchPage.enterFromStation('Pune');
    const suggestionCount = await trainSearchPage.getStationSuggestionCount();
    expect(suggestionCount).toBeGreaterThan(0);
})

test('TC_03 Verify that only valid city names appear in the suggestion list', async () => {

    const searchText = 'Pun';
    await trainSearchPage.enterFromStation(searchText);

    const suggestions = await trainSearchPage.getAllStationSuggestions();

    // Ensure suggestions exist
    expect(suggestions.length).toBeGreaterThan(0);

    // Validate each suggestion contains the search text
    for (const suggestion of suggestions) {
        if (suggestion.includes('----- Stations -----')) {
            continue;
        }
        expect(suggestion.toLowerCase())
            .toContain(searchText.toLowerCase());
    }

});

test('TC_04 Verify that invalid city names do not appear in the suggestion list.', async () => {
    const invalidSearchText = 'rajpuri';
    await trainSearchPage.enterFromStation(invalidSearchText);

    const suggestions = await trainSearchPage.getAllStationSuggestions();

    // Ensure suggestions exist
    expect(suggestions.length).toBeZero();

    // Validate each suggestion contains the search text
    for (const suggestion of suggestions) {
        if (suggestion.includes('----- Stations -----')) {
            continue;
        }
        expect(suggestion.toLowerCase()).not.toContain(invalidSearchText.toLowerCase());
    }
});

test('TC_05 Verify that the placeholder text is visible before entering a city name.', async () => {
    await expect(trainSearchPage.FROM_STATION_PLACEHOLDER_LOCATOR).toBeVisible();
});

test('TC_06 Verify that the placeholder moves above the field after entering a city name.', async () => {

    expect(trainSearchPage.FROM_AUTOCOMPLETE_WRAPPER_LOCATOR).not.toHaveClass('form-group ng-tns-c68-7 ng-touched ui-inputwrapper-focus ui-inputwrapper-filled ng-dirty ng-valid');

    await trainSearchPage.enterFromStation('Pune');

    expect(trainSearchPage.FROM_AUTOCOMPLETE_WRAPPER_LOCATOR).toHaveClass('form-group ng-tns-c68-7 ng-touched ui-inputwrapper-focus ui-inputwrapper-filled ng-dirty ng-valid');
})

// This is a bug
test('TC_07 Verify whether special characters are allowed in the From City field', async() =>{
    const invalidCityName = '@#$%Pune!';
    await trainSearchPage.enterFromStation(invalidCityName);
    await trainSearchPage.page.waitForTimeout(1000);
    const suggestions = await trainSearchPage.getAllStationSuggestions();
    expect(suggestions.length).toBeGreaterThan(0);
    
})

