import {test, expect} from '@fixtures/winFixtures';
import {STATS_API_PATH, buildEncodedFilterParams} from '@utils/helper';
import {CHECKBOX_FILTERS} from '@utils/filterTestData';

test.describe('Filters baseline', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();
    });

    test('opening filter dialog without any prior selection fires API request without filter params', async ({page, winWinSite}) => {
        const requestPromise = page.waitForRequest(
            req => req.url().includes(STATS_API_PATH),
            {timeout: 15_000},
        );

        await winWinSite.filtersPanel.open();
        const request = await requestPromise;

        expect(request.url()).not.toContain('filters');

        await winWinSite.filtersPanel.close();
    });
});

test.describe('Big filter panel – selecting a filter changes the API request URL', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();
    });

    for (const filter of CHECKBOX_FILTERS) {
        test(`"${filter.label}": select → API URL contains filter params → clear`, async ({page, winWinSite}) => {
            const {filtersPanel} = winWinSite;
            const params = buildEncodedFilterParams(filter.groupId, filter.optionId);

            await filtersPanel.open();

            const option = filtersPanel.getFilterOption(filter.label);

            await expect(filtersPanel.modal).toBeVisible();
            await expect(option).toHaveAttribute('aria-checked', 'false');

            const requestPromise = page.waitForRequest(
                req =>
                    req.url().includes(STATS_API_PATH) &&
                    req.url().includes(params.group) &&
                    req.url().includes(params.option),
                {timeout: 20_000},
            );

            await option.click();
            const request = await requestPromise;

            await expect(option).toHaveAttribute('aria-checked', 'true');
            expect(request.url()).toContain(params.group);
            expect(request.url()).toContain(params.option);

            await filtersPanel.clearAll();
            await expect(option).toHaveAttribute('aria-checked', 'false');
        });
    }
});

test.describe('Recommended filter buttons – activate, pre-select, API verify', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();
    });

    for (const filter of CHECKBOX_FILTERS) {
        test(`"${filter.label}" quick-filter: activate → checkbox pre-checked → API contains filter params`, async ({page, winWinSite}) => {
            const {homePage, filtersPanel} = winWinSite;
            const params = buildEncodedFilterParams(filter.groupId, filter.optionId);

            const quickFilter = homePage.recommendedFilter(filter.label);

            await expect(quickFilter).not.toHaveAttribute('data-active');

            await quickFilter.click();
            await expect(quickFilter).toHaveAttribute('data-active');

            const requestPromise = page.waitForRequest(
                req =>
                    req.url().includes(STATS_API_PATH) &&
                    req.url().includes(params.group) &&
                    req.url().includes(params.option),
                {timeout: 15_000},
            );

            await filtersPanel.open();
            const request = await requestPromise;

            await expect(filtersPanel.getFilterOption(filter.label)).toHaveAttribute('aria-checked', 'true');
            expect(request.url()).toContain(params.group);
            expect(request.url()).toContain(params.option);

            await filtersPanel.close();
        });
    }

    test('"Total price <€500" quick-filter: activate → API contains price-range params', async ({page, winWinSite}) => {
        const {homePage, filtersPanel} = winWinSite;

        await expect(homePage.totalPriceUnder500).not.toHaveAttribute('data-active');

        await homePage.totalPriceUnder500.click();
        await expect(homePage.totalPriceUnder500).toHaveAttribute('data-active');

        const requestPromise = page.waitForRequest(
            req =>
                req.url().includes(STATS_API_PATH) &&
                req.url().includes('filters%5B0%5D.type=PRICE_RANGE') &&
                req.url().includes('filters%5B0%5D.rangeUpper=500'),
            {timeout: 15_000},
        );

        await filtersPanel.open();
        const request = await requestPromise;

        await expect(filtersPanel.maxPriceInput).toHaveAttribute('placeholder', '$500');
        expect(request.url()).toContain('filters%5B0%5D.type=PRICE_RANGE');
        expect(request.url()).toContain('filters%5B0%5D.rangeUpper=500');

        await filtersPanel.close();
    });
});

test.describe('Filters – clear all', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();
    });

    test('"Clear all" resets all checked options to unchecked', async ({winWinSite}) => {
        const {filtersPanel} = winWinSite;

        await filtersPanel.open();

        const dogsAllowed = filtersPanel.getFilterOption('Dogs allowed');
        const breakfast = filtersPanel.getFilterOption('Breakfast');

        await dogsAllowed.click();
        await breakfast.click();

        await expect(dogsAllowed).toHaveAttribute('aria-checked', 'true');
        await expect(breakfast).toHaveAttribute('aria-checked', 'true');

        await filtersPanel.clearAll();

        await expect(dogsAllowed).toHaveAttribute('aria-checked', 'false');
        await expect(breakfast).toHaveAttribute('aria-checked', 'false');
    });
});