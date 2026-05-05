import {BasePageObject} from '@pages/BasePageObject';
import {Locator, Page} from '@playwright/test';

export class FiltersPanel extends BasePageObject {
    constructor(page: Page, baseURL: string) {
        super(page, baseURL);
    }

    openButton = this.page.locator('[data-wwt-id="main-search__big-filter-open--button"]');
    modal = this.page.locator('[data-wwt-id="big-filter--modal"]');
    applyButton = this.page.locator('[data-wwt-id="big-filter__submit--button"]').first();
    clearAllButton = this.page.locator('[data-wwt-id="big-filter__clear-all--button"]').first();
    closeButton = this.page.locator('[data-wwt-id="dialog__close--button"]');

    // Placeholder changes when a price filter is active: no filter → '$2001+', <€500 → '$500'
    maxPriceInput = this.page.locator('[data-wwt-id="filter__price-max--input"]');

    async open() {
        await this.openButton.click();
        await this.modal.waitFor({state: 'visible'});
    }

    async close() {
        await this.closeButton.click();
        await this.modal.waitFor({state: 'hidden'});
    }

    async apply() {
        await this.applyButton.click();
    }

    async clearAll() {
        await this.clearAllButton.click();
    }

    // Checkbox buttons have no text — the label lives in a sibling element.
    getFilterOption(label: string): Locator {
        return this.modal
            .locator('div, li, label')
            .filter({hasText: new RegExp(`^${escapeRegex(label)}$`)})
            .locator('[data-wwt-id="filter__option--checkbox"]');
    }
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}