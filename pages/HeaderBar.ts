import {BasePageObject} from '@pages/BasePageObject';
import {Page} from '@playwright/test';

export class HeaderBar extends BasePageObject {
    constructor(page: Page, baseURL: string) {
        super(page, baseURL);
    }

    logoWin = this.page.locator('[data-wwt-id="header__logo--link"]')
    getDiscountButton = this.page.locator('[data-wwt-id="promo-button__get-discount--link"]');
    shareButton = this.page.locator('[data-wwt-id="header__share--button"]');
    notificationButton = this.page.locator('[data-wwt-id="header__notifications--button"]');
    likeLinkInactive = this.page.locator('[data-wwt-id="header__like-link-not-active--unique"]');
    likeLinkActive = this.page.locator('[data-wwt-id="header__like-link--unique"]');
    accountButton = this.page.locator('[data-wwt-id="header__account--button"]');
    registerButton = this.page.locator('[data-wwt-id="header__register--button"]');
    signInButton = this.page.locator('[data-wwt-id="header__sign-in--button"]')


}

