import {Page} from '@playwright/test';
import {BasePageObject} from './BasePageObject';

export class HomePage extends BasePageObject {
    constructor(page: Page, baseURL: string) {
        super(page, baseURL);
    }

    recommendedFilter = (name: string) =>
        this.page
            .locator('[data-wwt-id="main-search__recommended-filter--button"]')
            .filter({hasText: name});

    totalPriceUnder500 = this.recommendedFilter('Total price');

    async open() {
        await this.goto('/landings/en/');
    }

    async dismissCookieBanner() {
        const closeBtn = this.page.locator('[data-wwt-id="toast__close--button"]');

        try {
            await closeBtn.click({timeout: 3_000});
        } catch {
            // Banner already dismissed or not visible
        }
    }
}