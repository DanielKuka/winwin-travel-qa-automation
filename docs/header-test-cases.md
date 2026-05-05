# Test Cases – Header Component (WinWin.travel)

**Scope:** `https://winwin.travel/landings/en/` — Header bar  
**Prepared for:** QA Automation Engineer Take-Home Task  
**Test environment:** Desktop Chrome (1280×720), guest (unauthenticated) user unless stated

---

## TC-H-001 · Logo is visible and navigates to the search page

| Field         | Value                                                                    |
|---------------|--------------------------------------------------------------------------|
| **ID**        | TC-H-001                                                                 |
| **Priority**  | P1                                                                       |
| **Type**      | Functional / Navigation                                                  |
| **Test Data** | Expected URL pattern: `https://winwin.travel/app` with search parameters |

**Preconditions:** User is on the landing page.

**Steps:**

1. Observe the header area.
2. Verify the WinWin logo is visible in the top-left.
3. Click the logo.

**Expected result:** The logo is displayed. Clicking it redirects to the `/app` search page with default search
parameters. The exact parameter values may vary based on current date and defaults.

---

## TC-H-002 · "Get Discount" button is visible and navigates to promo page

| Field         | Value                                                |
|---------------|------------------------------------------------------|
| **ID**        | TC-H-002                                             |
| **Priority**  | P1                                                   |
| **Type**      | Functional / Navigation                              |
| **Test Data** | Expected URL: `https://winwin.travel/promo-codes/en` |

**Preconditions:** User is on the landing page.

**Steps:**

1. Locate the "Get Discount" button in the header.
2. Verify it is visible and enabled.
3. Click it.

**Expected result:** User is navigated to `https://winwin.travel/promo-codes/en`.

---

## TC-H-003 · Share button is visible and opens share menu with all options

| Field         | Value                                                                               |
|---------------|-------------------------------------------------------------------------------------|
| **ID**        | TC-H-003                                                                            |
| **Priority**  | P2                                                                                  |
| **Type**      | Functional / UI                                                                     |
| **Test Data** | Expected options: Copy link, Messenger, Instagram, WhatsApp, Facebook, More options |

**Preconditions:** User is on the landing page.

**Steps:**

1. Locate the Share button (icon) in the header.
2. Verify it is visible.
3. Click it.
4. Observe all options inside the share menu.

**Expected result:** A share menu opens and displays the following options: Copy link, Messenger, Instagram, WhatsApp,
Facebook, More options.

---

## TC-H-003a · "Copy link" option copies the page URL to clipboard

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-003a       |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Share menu is open (see TC-H-003).

**Steps:**

1. Click "Copy link" in the share menu.
2. Paste the clipboard content into any text field.

**Expected result:** The current page URL is copied to the clipboard.

---

## TC-H-003b · Social share options open correct external links

| Field         | Value                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------|
| **ID**        | TC-H-003b                                                                                                  |
| **Priority**  | P2                                                                                                         |
| **Type**      | Functional / Navigation                                                                                    |
| **Test Data** | Messenger → messenger.com, Instagram → instagram.com, WhatsApp → web.whatsapp.com, Facebook → facebook.com |

**Preconditions:** Share menu is open (see TC-H-003).

**Steps:**

1. Click "Messenger" and verify it opens the correct external URL.
2. Return and open the share menu again.
3. Click "Instagram" and verify it opens the correct external URL.
4. Repeat for "WhatsApp" and "Facebook".

**Expected result:** Each social option opens its respective external platform URL in a new tab. No 404 or error pages
are shown.

---

## TC-H-003c · "More options" shows "under development" tooltip

| Field         | Value                                                      |
|---------------|------------------------------------------------------------|
| **ID**        | TC-H-003c                                                  |
| **Priority**  | P3                                                         |
| **Type**      | Functional / UI                                            |
| **Test Data** | Expected tooltip text: "This feature is under development" |

**Preconditions:** Share menu is open (see TC-H-003).

**Steps:**

1. Hover over "More options" in the share menu.
2. Observe the tooltip.
3. Click "More options".

**Expected result:** On hover, a tooltip appears with the message "This feature is under development". Clicking "More
options" does not open any page or modal.

---

## TC-H-004 · Notifications button is visible and shows "under development" tooltip

| Field         | Value                                                      |
|---------------|------------------------------------------------------------|
| **ID**        | TC-H-004                                                   |
| **Priority**  | P3                                                         |
| **Type**      | Functional / UI                                            |
| **Test Data** | Expected tooltip text: "This feature is under development" |

**Preconditions:** User is on the landing page.

**Steps:**

1. Locate the Notifications button (bell icon) in the header.
2. Verify it is visible.
3. Hover over the button.
4. Click the button.

**Expected result:** The button is visible. On hover, a tooltip appears with the message "This feature is under
development". Clicking the button does not open any page or modal.

---

## TC-H-005 · Like icon is inactive by default when no items are liked

| Field        | Value              |
|--------------|--------------------|
| **ID**       | TC-H-005           |
| **Priority** | P2                 |
| **Type**     | Functional / State |

**Preconditions:** User has no liked items (fresh session or cleared state). User is on the landing page.

**Steps:**

1. Locate the Like icon in the header.
2. Observe its state and counter badge.

**Expected result:** The inactive like icon is visible. No counter badge is displayed. The active variant of the icon is
not visible. On hover, a tooltip appears with the message "Not enough likes!".

---

## TC-H-006 · Account dropdown contains correct menu items for guest user

| Field         | Value                                                                          |
|---------------|--------------------------------------------------------------------------------|
| **ID**        | TC-H-006                                                                       |
| **Priority**  | P2                                                                             |
| **Type**      | Functional / UI                                                                |
| **Test Data** | Expected items: Account settings, My Travels, Chat, Restart tutorial, Language |

**Preconditions:** User is not authenticated. User is on the landing page.

**Steps:**

1. Locate the Account button in the header and verify it is visible.
2. Click the Account button.
3. Observe the dropdown menu items.

**Expected result:** The dropdown opens and contains exactly the following items in order: Account settings, My Travels,
Chat, Restart tutorial, Language. "Log Out" is NOT displayed.

---

## TC-H-006a · Account dropdown contains "Log Out" for authenticated user

| Field         | Value                                                                             |
|---------------|-----------------------------------------------------------------------------------|
| **ID**        | TC-H-006a                                                                         |
| **Priority**  | P2                                                                                |
| **Type**      | Functional / UI                                                                   |
| **Test Data** | Test account: valid credentials. Expected extra item: "Log Out" as the last entry |

**Preconditions:** User is logged in with a valid test account. User is on the landing page.

**Steps:**

1. Click the Account button in the header.
2. Observe the dropdown menu items.

**Expected result:** The dropdown contains all items from TC-H-006 (Account settings, My Travels, Chat, Restart
tutorial, Language) plus "Log Out" as the last item.

---

## TC-H-006b · "Account settings" menu item — currently non-functional

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-006b       |
| **Priority** | P3              |
| **Type**     | Functional / UI |

**Preconditions:** Account dropdown is open (authenticated or guest user).

**Steps:**

1. Click "Account settings" in the dropdown.

**Expected result:** Nothing happens. No navigation, no modal, no error. 
*(Known behavior — On hover, a tooltip appears with the message "This feature is under development"..)*

---

## TC-H-006c · "My Travels" opens sign-in modal for guest user

| Field        | Value             |
|--------------|-------------------|
| **ID**       | TC-H-006c         |
| **Priority** | P1                |
| **Type**     | Functional / Auth |

**Preconditions:** User is NOT authenticated. Account dropdown is open.

**Steps:**

1. Click "My Travels" in the dropdown.
2. Observe the result.
3. Close the modal using the close button.

**Expected result:** The sign-in modal opens (identical to clicking "Sign In" in the header). After closing — user
remains on the landing page.

---

## TC-H-006d · "My Travels" shows empty state for authenticated user with no reservations

| Field         | Value                                                                                                           |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**        | TC-H-006d                                                                                                       |
| **Priority**  | P1                                                                                                              |
| **Type**      | Functional / UI                                                                                                 |
| **Test Data** | Test account with no reservations. Expected texts: "My travels", "No results found", "No reserved offers found" |

**Preconditions:** User is logged in with a valid test account that has no reservations. Account dropdown is open.

**Steps:**

1. Click "My Travels" in the dropdown.
2. Observe the modal content.
3. Click "Go to homepage".

**Expected result:** A modal opens displaying the title "My travels", message "No results found", subtext "No reserved
offers found", and a "Go to homepage" button. Clicking "Go to homepage" closes the modal and returns the user to the
landing page.

---

## TC-H-006e · "Chat" opens Chat Centre modal and can be closed

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-006e       |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Account dropdown is open (authenticated or guest user).

**Steps:**

1. Click "Chat" in the dropdown.
2. Observe the result.
3. Close the modal using a close button.

**Expected result:** The "Chat Centre" modal opens. After closing — user remains on the landing page.

---

## TC-H-006f · "Restart tutorial" opens Welcome modal with correct content

| Field         | Value                                                                                            |
|---------------|--------------------------------------------------------------------------------------------------|
| **ID**        | TC-H-006f                                                                                        |
| **Priority**  | P2                                                                                               |
| **Type**      | Functional / UI                                                                                  |
| **Test Data** | Expected title: "Welcome to WinWin.travel!". Expected buttons: "Skip tutorial", "Start tutorial" |

**Preconditions:** Account dropdown is open (authenticated or guest user).

**Steps:**

1. Click "Restart tutorial" in the dropdown.
2. Observe the modal content and available buttons.

**Expected result:** A modal opens containing the title "Welcome to WinWin.travel!", a description text about the
platform, a "Skip tutorial" button, a "Start tutorial" button, and a close button.

---

## TC-H-006g · "Skip tutorial" closes the Welcome modal and returns to landing page

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-006g       |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Welcome tutorial modal is open (see TC-H-006f).

**Steps:**

1. Click "Skip tutorial".

**Expected result:** The modal closes. User remains on the landing page. Tutorial is not started.

---

## TC-H-006h · "Start tutorial" launches the tutorial flow

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-006h       |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Welcome tutorial modal is open (see TC-H-006f).

**Steps:**

1. Click "Start tutorial".

**Expected result:** The tutorial flow begins and the first tutorial step is shown.

---

## TC-H-007 · "Register" button is visible for guest user and opens registration modal

| Field        | Value             |
|--------------|-------------------|
| **ID**       | TC-H-007          |
| **Priority** | P1                |
| **Type**     | Functional / Auth |

**Preconditions:** User is not authenticated. User is on the landing page.

**Steps:**

1. Locate the "Register" button in the header.
2. Verify it is visible and enabled.
3. Click it.

**Expected result:** The registration modal opens.

---

## TC-H-008 · "Sign In" button is visible for guest user and opens sign-in modal

| Field        | Value             |
|--------------|-------------------|
| **ID**       | TC-H-008          |
| **Priority** | P1                |
| **Type**     | Functional / Auth |

**Preconditions:** User is not authenticated. User is on the landing page.

**Steps:**

1. Locate the "Sign In" button in the header.
2. Verify it is visible and enabled.
3. Click it.

**Expected result:** The sign-in modal opens.

---

## TC-H-009 · "Register" and "Sign In" buttons are hidden for authenticated user

| Field         | Value                            |
|---------------|----------------------------------|
| **ID**        | TC-H-009                         |
| **Priority**  | P2                               |
| **Type**      | Functional / State               |
| **Test Data** | Test account: valid credentials. |

**Preconditions:** User is logged in with a valid test account.

**Steps:**

1. Navigate to the landing page.
2. Observe the header.

**Expected result:** "Register" and "Sign In" buttons are not displayed.

---

## TC-H-010 · Header hides on scroll down and reappears on scroll up

| Field        | Value       |
|--------------|-------------|
| **ID**       | TC-H-010    |
| **Priority** | P2          |
| **Type**     | UI / Visual |

**Preconditions:** User is on the landing page. Page content is long enough to scroll.

**Steps:**

1. Observe the header — it is visible at the top.
2. Scroll down the page.
3. Observe the header.
4. Scroll back up.
5. Observe the header again.

**Expected result:** After scrolling down — the header is hidden (not visible in the viewport). After scrolling back
up — the header reappears at the top of the viewport.

---

## TC-H-011 · All header navigation links return valid responses

| Field        | Value                         |
|--------------|-------------------------------|
| **ID**       | TC-H-011                      |
| **Priority** | P2                            |
| **Type**     | Integration / Link Validation |

**Preconditions:** User is on the landing page.

**Steps:**

1. Click the Logo link and verify the resulting page loads without error.
2. Navigate back to the landing page.
3. Click the "Get Discount" link and verify the resulting page loads without error.

**Expected result:** Every link navigates to its target page successfully. No 404 or error pages are shown.

---

## TC-H-013 · Header is accessible via keyboard navigation

| Field        | Value         |
|--------------|---------------|
| **ID**       | TC-H-013      |
| **Priority** | P3            |
| **Type**     | Accessibility |

**Preconditions:** User is on the landing page.

**Steps:**

1. Place keyboard focus at the start of the page.
2. Press Tab repeatedly through the header elements.

**Expected result:** Focus moves through header interactive elements in a logical order. Each focused element has a
visible focus ring. No focus trap occurs.

---

## TC-H-014 · Header loads within acceptable time

| Field         | Value                                             |
|---------------|---------------------------------------------------|
| **ID**        | TC-H-014                                          |
| **Priority**  | P3                                                |
| **Type**      | Performance                                       |
| **Test Data** | Network throttling: Fast 3G. Threshold: 3 seconds |

**Preconditions:** Browser network throttling is set to Fast 3G.

**Steps:**

1. Open the landing page.
2. Measure the time until the header is fully visible (logo and buttons rendered).

**Expected result:** All header elements are visible.

---

## TC-H-015 · Liking an item activates the header icon and shows a counter

| Field        | Value                                   |
|--------------|-----------------------------------------|
| **ID**       | TC-H-015                                |
| **Priority** | P1                                      |
| **Type**     | Functional / State (Header integration) |

**Preconditions:** User has no liked items. User is on the search results page (`https://winwin.travel/app`) with at
least one accommodation item visible.

**Steps:**

1. Locate any accommodation item and click the Like button on it.
2. Observe the header icon.

**Expected result:** The header like icon switches to its active state. A counter badge appears showing `1`.

---

## TC-H-016 · Like counter in header matches total number of liked items

| Field        | Value                                   |
|--------------|-----------------------------------------|
| **ID**       | TC-H-016                                |
| **Priority** | P1                                      |
| **Type**     | Functional / State (Header integration) |

**Preconditions:** User has no liked items. User is on the search results page with at least 3 accommodation items
visible.

**Steps:**

1. Like the 1st item. Observe the header counter.
2. Like the 2nd item. Observe the header counter.
3. Like the 3rd item. Observe the header counter.

**Expected result:** After the 1st like — counter shows `1`. After the 2nd — `2`. After the 3rd — `3`. The counter
always matches the total number of liked items.

---

## TC-H-017 · Clicking the active like icon redirects to the comparison page

| Field         | Value                                                |
|---------------|------------------------------------------------------|
| **ID**        | TC-H-017                                             |
| **Priority**  | P1                                                   |
| **Type**      | Functional / Navigation                              |
| **Test Data** | Expected URL: `https://winwin.travel/app/comparison` |

**Preconditions:** At least one item is liked. Header icon is in its active state with a counter. User is on the search
results page.

**Steps:**

1. Click the active like icon in the header.

**Expected result:** User is redirected to `https://winwin.travel/app/comparison`.

---

## TC-H-018 · Removing a like decreases the header counter by 1

| Field        | Value                                   |
|--------------|-----------------------------------------|
| **ID**       | TC-H-018                                |
| **Priority** | P1                                      |
| **Type**     | Functional / State (Header integration) |

**Preconditions:** User has 2 liked items. Header counter shows `2`. User is on the search results page with the liked
items visible.

**Steps:**

1. Locate one of the previously liked items.
2. Click its Like button again to remove the like.
3. Observe the header counter.

**Expected result:** The counter decreases to `1`. If the last remaining like is removed, the counter badge disappears
and the header icon returns to its inactive state.

---

## TC-H-019 · Disliking a liked item decreases the header counter by 1

| Field        | Value                                   |
|--------------|-----------------------------------------|
| **ID**       | TC-H-019                                |
| **Priority** | P1                                      |
| **Type**     | Functional / State (Header integration) |

**Preconditions:** User has 2 liked items. Header counter shows `2`. User is on the search results page with the liked
items visible.

**Steps:**

1. Locate one of the previously liked items.
2. Click the Dislike button on that item.
3. Observe the header counter.

**Expected result:** The counter decreases to `1`. The disliked item is removed from the liked count.

---

## TC-H-020 · Disliking an item with no prior like does not show a negative counter

| Field        | Value               |
|--------------|---------------------|
| **ID**       | TC-H-020            |
| **Priority** | P2                  |
| **Type**     | Negative / Boundary |

**Preconditions:** User has 0 liked items. Header counter badge is not displayed. User is on the search results page.

**Steps:**

1. Locate any accommodation item that has not been liked.
2. Click the Dislike button on that item.
3. Observe the header icon and counter.

**Expected result:** The counter badge does not appear. The header icon remains in its inactive state. No negative
value (e.g. `-1`) is displayed.

---

## TC-H-021 · Clicking outside the account dropdown closes it

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-021        |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Account dropdown is open. User is on the landing page.

**Steps:**

1. Click anywhere outside the account dropdown (e.g. on the page background).
2. Observe the dropdown.

**Expected result:** The dropdown closes. No navigation occurs.

---

## TC-H-022 · Pressing Escape closes the account dropdown

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-022        |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Account dropdown is open. User is on the landing page.

**Steps:**

1. Press the Escape key.
2. Observe the dropdown.

**Expected result:** The dropdown closes. No navigation occurs.

---

## TC-H-023 · Pressing Escape closes an open modal (share / chat / tutorial)

| Field        | Value           |
|--------------|-----------------|
| **ID**       | TC-H-023        |
| **Priority** | P2              |
| **Type**     | Functional / UI |

**Preconditions:** Any header-triggered modal is open (Share, Chat Centre, or Tutorial). User is on the landing page.

**Steps:**

1. Open any modal via a header button (Share, Chat, or Restart tutorial).
2. Press the Escape key.
3. Observe the modal.

**Expected result:** The modal closes. User remains on the landing page.

---

*End of test cases for the Header component.*