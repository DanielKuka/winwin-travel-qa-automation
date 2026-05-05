import {BasePageObject} from '@pages/BasePageObject';
import {Page} from '@playwright/test';

export const MIN_ADULTS = 1;
export const MAX_ADULTS = 10;

export const PET_TYPE_OPTIONS = ['Dog', 'Cat', 'Other'] as const;
export type PetType = typeof PET_TYPE_OPTIONS[number];

export const DOG_WEIGHT_OPTIONS = ['<1 kg', '1-5 kg', '5-10 kg', '10-15 kg', '15-20 kg', '>20 kg'] as const;
export type DogWeightOption = typeof DOG_WEIGHT_OPTIONS[number];

export class GuestSelect extends BasePageObject {
    constructor(page: Page, baseURL: string) {
        super(page, baseURL);
    }

    openButton = this.page
        .locator('[data-wwt-id="guests-select__open--button"]')
        .filter({visible: true})
        .first();

    modal = this.page
        .locator('[data-wwt-id="guests-select__mobile--modal"], [data-wwt-id="guests-select__desktop--modal"], [role="dialog"]')
        .filter({visible: true})
        .first();

    confirmButton = this.page
        .locator('[data-wwt-id="guests-select__modal-confirm--button"]')
        .filter({visible: true})
        .first();

    adultsSection = this.page.locator('[data-wwt-id="guests-select__adults-number--input"]');
    adultsInput = this.adultsSection.locator('[data-wwt-id="number-counter__input--input"]');
    adultsPlusButton = this.adultsSection.locator('[data-wwt-id="number-counter__plus--button"]');
    adultsMinusButton = this.adultsSection.locator('[data-wwt-id="number-counter__minus--button"]');

    petsSection = this.page.locator('[data-wwt-id="guests-select__pets-number--input"]');
    petsPlusButton = this.petsSection.locator('[data-wwt-id="number-counter__plus--button"]');

    petTypeButton = this.page.locator('[data-wwt-id="guests-select__pet-type--select"]');
    petWeightButton = this.page.locator('[data-wwt-id="guests-select__pet-weight--select"]');

    async open() {
        await this.openButton.waitFor({state: 'visible', timeout: 15_000});
        await this.openButton.click();

        await this.adultsInput.waitFor({state: 'visible', timeout: 15_000});
    }

    async getAdultsCount() {
        return parseInt(await this.adultsInput.inputValue(), 10);
    }

    async clickAdultsPlus() {
        await this.adultsPlusButton.click();
    }

    async clickAdultsMinus() {
        await this.adultsMinusButton.click();
    }

    async addPet() {
        await this.petsPlusButton.click();
        await this.petTypeButton.waitFor({state: 'visible', timeout: 15_000});
    }

    async selectPetType(type: PetType) {
        await this.petTypeButton.click();
        await this.page.getByRole('option', {name: type, exact: true}).click();
    }

    async selectPetWeight(weight: DogWeightOption) {
        await this.petWeightButton.click();
        await this.page.getByRole('option', {name: weight, exact: true}).click();
    }

    async getPetTypeValue() {
        return (await this.petTypeButton.textContent() ?? '').trim();
    }

    async getPetWeightValue() {
        return (await this.petWeightButton.textContent() ?? '').trim();
    }

    async getPetTypeOptions() {
        await this.petTypeButton.click();

        const options = await this.page
            .getByRole('option')
            .allTextContents();

        await this.page.keyboard.press('Escape');

        return options.map(option => option.trim());
    }

    async getPetWeightOptions() {
        await this.petWeightButton.click();

        const options = await this.page
            .getByRole('option')
            .allTextContents();

        await this.page.keyboard.press('Escape');

        return options.map(option => option.trim());
    }
}