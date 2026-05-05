import { WinWinSite } from "../pages";
import { test as base } from '@playwright/test';

export const test = base.extend<{ winWinSite: WinWinSite }>({
    winWinSite: async ({ page }, use) => {
        const winWinSite = new WinWinSite(page);
        await use(winWinSite);
    },
});

export { expect } from '@playwright/test';