import {test, expect} from '@fixtures/winFixtures';
import {MAX_ADULTS, MIN_ADULTS, DOG_WEIGHT_OPTIONS, PET_TYPE_OPTIONS} from '@pages/index';

test.describe('Guests selector', () => {
    test.beforeEach(async ({winWinSite}) => {
        await winWinSite.homePage.open();
        await winWinSite.guestSelect.open();
    });

    test.afterEach(async ({winWinSite}) => {
        const isVisible = await winWinSite.guestSelect.modal.isVisible();

        if (isVisible) {
            await winWinSite.guestSelect.confirmButton.click();
        }
    });

    test.describe('Max adults selection', () => {
        test('should not allow selecting more than max adults', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            const initialCount = await guestSelect.getAdultsCount();

            for (let count = initialCount; count < MAX_ADULTS; count++) {
                await guestSelect.clickAdultsPlus();
            }

            await expect(guestSelect.adultsInput).toHaveValue(String(MAX_ADULTS));
            await expect(guestSelect.adultsPlusButton).toBeDisabled();
            await expect(guestSelect.adultsPlusButton).toHaveAttribute('aria-disabled', 'true');
            await expect(guestSelect.adultsMinusButton).toBeEnabled();
        });

        test('should not allow selecting less than minimum adults', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            const initialCount = await guestSelect.getAdultsCount();

            for (let count = initialCount; count > MIN_ADULTS; count--) {
                await guestSelect.clickAdultsMinus();
            }

            await expect(guestSelect.adultsInput).toHaveValue(String(MIN_ADULTS));
            await expect(guestSelect.adultsMinusButton).toBeDisabled();
            await expect(guestSelect.adultsMinusButton).toHaveAttribute('aria-disabled', 'true');
            await expect(guestSelect.adultsPlusButton).toBeEnabled();
        });

        test('should increment adults count by one after clicking plus button', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            const start = await guestSelect.getAdultsCount();

            await guestSelect.clickAdultsPlus();

            await expect(guestSelect.adultsInput).toHaveValue(String(start + 1));
        });

        test('should decrement adults count by one after clicking minus button', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            await guestSelect.clickAdultsPlus();

            const start = await guestSelect.getAdultsCount();

            await guestSelect.clickAdultsMinus();

            await expect(guestSelect.adultsInput).toHaveValue(String(start - 1));
        });
    });

    test.describe('Pet type and weight options', () => {
        test.beforeEach(async ({winWinSite}) => {
            await winWinSite.guestSelect.addPet();
        });

        test('pet type dropdown contains all expected options', async ({winWinSite}) => {
            const options = await winWinSite.guestSelect.getPetTypeOptions();

            expect(options).toEqual(expect.arrayContaining([...PET_TYPE_OPTIONS]));
        });

        test('default pet type is Dog', async ({winWinSite}) => {
            await expect(winWinSite.guestSelect.petTypeButton).toContainText('Dog');
        });

        test('dog weight dropdown contains all expected options', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            await guestSelect.selectPetType('Dog');

            const options = await guestSelect.getPetWeightOptions();

            expect(options).toEqual(expect.arrayContaining([...DOG_WEIGHT_OPTIONS]));
        });

        for (const weight of DOG_WEIGHT_OPTIONS) {
            test(`Dog weight option "${weight}" can be selected and reflects in UI`, async ({winWinSite}) => {
                const {guestSelect} = winWinSite;

                await guestSelect.selectPetType('Dog');
                await guestSelect.selectPetWeight(weight);

                await expect(guestSelect.petWeightButton).toContainText(weight);
            });
        }

        for (const weight of DOG_WEIGHT_OPTIONS) {
            test(`Other pet weight option "${weight}" can be selected and reflects in UI`, async ({winWinSite}) => {
                const {guestSelect} = winWinSite;

                await guestSelect.selectPetType('Other');
                await guestSelect.selectPetWeight(weight);

                await expect(guestSelect.petTypeButton).toContainText('Other');
                await expect(guestSelect.petWeightButton).toContainText(weight);
            });
        }

        test('Cat pet type can be selected and weight dropdown disappears', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            await guestSelect.selectPetType('Cat');

            await expect(guestSelect.petTypeButton).toContainText('Cat');
            await expect(guestSelect.petWeightButton).toBeHidden();
        });

        test('Other pet type can be selected and weight dropdown is available', async ({winWinSite}) => {
            const {guestSelect} = winWinSite;

            await guestSelect.selectPetType('Other');

            await expect(guestSelect.petTypeButton).toContainText('Other');
            await expect(guestSelect.petWeightButton).toBeVisible();
            await expect(guestSelect.petWeightButton).toBeEnabled();
        });
    });
});