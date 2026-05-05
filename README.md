# WinWin.travel – QA Automation

[![WinWin Tests](https://github.com/DanielKuka/winwin-travel-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/DanielKuka/winwin-travel-qa-automation/actions/workflows/playwright.yml)

End-to-end test suite for [winwin.travel](https://winwin.travel/landings/en/) built with **Playwright + TypeScript**.

---

## Table of Contents

- [Stack](#stack)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Automated Scenarios](#automated-scenarios)
- [Page Object Model](#page-object-model)
- [Key Practices](#key-practices)
- [CI](#ci)
- [Manual Test Cases](#manual-test-cases)

---

## Stack

| Tool       | Version              |
|------------|----------------------|
| Playwright | ^1.59                |
| TypeScript | ^5.5                 |
| Node.js    | LTS                  |
| Browser    | Chromium (Playwright)|

---

## Setup

### 1. Install Node dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Configure environment

Create a `.env` file in the project root (see `.env.example`):

```env
WINWIN_BASE_URL=https://winwin.travel
```

> The base URL defaults to `https://winwin.travel` if not provided.

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test files
npx playwright test tests/guests/guests.test.ts
npx playwright test tests/filters/filters.test.ts
npx playwright test tests/home-page/home-page.test.ts

# Run with a single worker
npx playwright test --workers=1

# Run in headed mode
npx playwright test --headed

# Open HTML report
npx playwright show-report
```

---

## Project Structure

```
.
├── fixtures/
│   └── winFixtures.ts
├── pages/
│   ├── BasePageObject.ts
│   ├── HomePage.ts
│   ├── HeaderBar.ts
│   ├── GuestsSelect.ts
│   ├── FiltersPanel.ts
│   └── index.ts
├── tests/
│   ├── home-page/
│   │   └── home-page.test.ts
│   ├── guests/
│   │   └── guests.test.ts
│   └── filters/
│       └── filters.test.ts
├── utils/
│   ├── helper.ts
│   └── filterTestData.ts
├── docs/
│   └── header-test-cases.md
├── playwright.config.ts
├── tsconfig.json
└── .env.example
```

---

## Automated Scenarios

### Scenario 1 – Max Adults Selection

| Test | What is verified |
|------|-----------------|
| Should not allow selecting more than max adults | Counter stops at `MAX_ADULTS` (10) and `+` becomes disabled |
| Should not allow selecting less than minimum adults | Counter stops at `MIN_ADULTS` (1) and `−` becomes disabled |
| Increment increases the value by one | Clicking `+` increases value by 1 |
| Decrement decreases the value by one | Clicking `−` decreases value by 1 |

### Scenario 2 – Pets Filter Options

| Test | What is verified |
|------|-----------------|
| Default pet type is Dog | "Dog" is selected by default |
| Dog weight options are selectable | All available weight options can be selected and reflected in UI |
| "Other" pet type is selectable | "Other" is reflected in UI |
| Weight selector is available for "Other" | Dropdown is visible and enabled |
| "Cat" hides weight selector | Weight dropdown is not visible |

### Scenario 3 – Filters Affect Request

| Test | What is verified |
|------|-----------------|
| No filters selected | API request has no filter params |
| Selecting filter in modal | Request URL contains encoded filter params |
| Quick filter activation | Filter is activated on HomePage and pre-selected in modal |
| Quick filter affects API request | Request contains correct filter params |
| Price filter | `PRICE_RANGE` params are present |
| Clear all | Resets filters to default state |

---

## Page Object Model

All interactions are abstracted via **Page Object Model** and accessed through the `WinWinSite` fixture:

```typescript
await winWinSite.homePage.open();
await winWinSite.guestSelect.open();

const initialCount = await winWinSite.guestSelect.getAdultsCount();
for (let count = initialCount; count < 10; count++) {
  await winWinSite.guestSelect.clickAdultsPlus();
}
```

Element selectors use stable `data-wwt-id` attributes from the application HTML.

---

## Key Practices

- **Page Object Model (POM)** – clean separation between test logic and UI interactions
- **Test data separation** – reusable data in `utils/filterTestData.ts`
- **Network validation** – `page.waitForRequest` for API-level assertions
- **Stable selectors** – `data-wwt-id` attributes, not brittle CSS classes
- **Soft assertions** – non-blocking UI checks where appropriate
- **CI integration** – automated runs via GitHub Actions

---

## CI

GitHub Actions runs the full test suite on every push and pull request to `main` / `master`.

The HTML report is uploaded as an artifact (`playwright-report`) and retained for **30 days**.

---

## Manual Test Cases

See [`docs/header-test-cases.md`](docs/header-test-cases.md).