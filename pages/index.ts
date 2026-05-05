import {Page} from '@playwright/test';
import {HomePage} from './HomePage';
import {FiltersPanel} from './FiltersPanel';
import {GuestSelect} from './GuestsSelect';
import {HeaderBar} from './HeaderBar';

export {
    MAX_ADULTS,
    MIN_ADULTS,
    PET_TYPE_OPTIONS,
    DOG_WEIGHT_OPTIONS,
} from './GuestsSelect';

export class WinWinSite {
    constructor(public page: Page) {}

    readonly baseURL = process.env.WINWIN_BASE_URL ?? 'https://winwin.travel';

    homePage = new HomePage(this.page, this.baseURL);
    filtersPanel = new FiltersPanel(this.page, this.baseURL);
    guestSelect = new GuestSelect(this.page, this.baseURL);
    header = new HeaderBar(this.page, this.baseURL);
}