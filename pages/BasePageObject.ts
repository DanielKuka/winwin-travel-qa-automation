import {Page} from '@playwright/test'

export abstract class BasePageObject {
    readonly page: Page;
    readonly baseURL: string;

    constructor(page: Page, baseURL: string) {
        this.page = page;
        this.baseURL = baseURL;
    }

    async goto(path = '') {
        await this.page.goto(`${this.baseURL}${path}`);
    }
}