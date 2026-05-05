import {test, expect} from '@fixtures/winFixtures';
import {RECOMMENDED_CHECKBOX_FILTERS} from '@utils/filterTestData';

test.describe('Header – guest user visibility smoke check', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();

        await expect(winWinSite.page).toHaveURL(`${winWinSite.baseURL}/landings/en/`, {timeout: 10_000});
    });

    test('All header elements are visible to the guest user', async ({winWinSite}) => {
        const {header} = winWinSite;

        await expect.soft(header.logoWin).toBeVisible();
        await expect.soft(header.getDiscountButton).toBeVisible();
        await expect.soft(header.shareButton).toBeVisible();
        await expect.soft(header.notificationButton).toBeVisible();
        await expect.soft(header.likeLinkInactive).toBeVisible();
        await expect.soft(header.accountButton).toBeVisible();
        await expect.soft(header.registerButton).toBeVisible();
        await expect.soft(header.signInButton).toBeVisible();
    });
});

test.describe('Recommended filter buttons – activate, verify, clear', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.homePage.dismissCookieBanner();
    });

    for (const filter of RECOMMENDED_CHECKBOX_FILTERS) {
        test(`"${filter.label}" quick-filter: activate → modal checkbox checked → clear → reset`, async ({winWinSite}) => {
            const {homePage, filtersPanel} = winWinSite;

            const quickFilter = homePage.recommendedFilter(filter.label);
            const modalOption = filtersPanel.getFilterOption(filter.label);

            await expect(quickFilter).toBeVisible();
            await expect(quickFilter).not.toHaveAttribute('data-active');
            await expect(filtersPanel.openButton).toHaveText('');

            await quickFilter.click();

            await expect(quickFilter).toHaveAttribute('data-active');
            await expect(filtersPanel.openButton).toHaveText('1');

            await filtersPanel.open();

            await expect(filtersPanel.modal).toBeVisible();
            await expect(modalOption).toBeVisible();
            await expect(modalOption).toHaveAttribute('aria-checked', 'true');

            await filtersPanel.clearAll();

            await expect(modalOption).toHaveAttribute('aria-checked', 'false');

            await filtersPanel.apply();

            await expect(filtersPanel.openButton).toHaveText('');
            await expect(quickFilter).not.toHaveAttribute('data-active');
        });
    }

    test('"Total price <€500" quick-filter: activate → max price set to $500 → clear → reset', async ({winWinSite}) => {
        const {homePage, filtersPanel} = winWinSite;
        const quickFilter = homePage.totalPriceUnder500;

        await expect(quickFilter).toBeVisible();
        await expect(quickFilter).not.toHaveAttribute('data-active');
        await expect(filtersPanel.openButton).toHaveText('');

        await quickFilter.click();

        await expect(quickFilter).toHaveAttribute('data-active');
        await expect(filtersPanel.openButton).toHaveText('1');

        await filtersPanel.open();

        await expect(filtersPanel.modal).toBeVisible();
        await expect(filtersPanel.maxPriceInput).toBeVisible();
        await expect(filtersPanel.maxPriceInput).toHaveAttribute('placeholder', '$500');

        await filtersPanel.clearAll();

        await expect(filtersPanel.maxPriceInput).toHaveAttribute('placeholder', '$2001+');

        await filtersPanel.apply();

        await expect(filtersPanel.openButton).toHaveText('');
        await expect(quickFilter).not.toHaveAttribute('data-active');
    });
});