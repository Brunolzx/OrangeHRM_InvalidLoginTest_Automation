# OrangeHRM Test Automation

End-to-end test suite for the [OrangeHRM demo application](https://opensource-demo.orangehrmlive.com), built with Cypress using the Page Object Model (POM) pattern.

---

## Test Suites

| Suite | File | TCs | Description |
|-------|------|-----|-------------|
| US01 - Valid Login | `ValidLogin.cy.js` | 8 | Login with valid credentials and Dashboard verification |
| US02 - Invalid Login | `InvalidLogin.cy.js` | - | Login with invalid/empty credentials |
| US03 - Logout | `Logout.cy.js` | 7 | Logout flow and post-logout access control |
| US04 - Create User | `CreateUser.cy.js` | 9 | Create, validate and search users via Admin panel |
| US05 - Edit User | `EditUser.cy.js` | 7 | Edit role, status and password of an existing user |

---

## Tech Stack

- **Framework:** [Cypress](https://www.cypress.io/)
- **Pattern:** Page Object Model (POM)
- **CI:** GitHub Actions

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── cypress_test.yml     # GitHub Actions CI pipeline
├── cypress/
│   ├── e2e/
│   │   ├── ValidLogin.cy.js
│   │   ├── Logout.cy.js
│   │   ├── CreateUser.cy.js
│   │   └── EditUser.cy.js
│   ├── Pages/
│   │   ├── LoginPage.js         # Login form selectors and actions
│   │   ├── DashboardPage.js     # Dashboard selectors, logout method
│   │   ├── AdminPage.js         # User list search, edit actions
│   │   └── AddUserPage.js       # Add User form selectors and actions
│   └── support/
│       ├── commands.js          # cy.login() / cy.loginAsAdmin() custom commands
│       └── e2e.js               # Global config (uncaught exception handler)
├── cypress.config.js
└── package.json
```

---

## Setup & Run

**Install dependencies**
```bash
npm install
```

**Open Cypress (interactive)**
```bash
npx cypress open
```

**Run all tests (headless)**
```bash
npx cypress run
```

**Run a specific suite**
```bash
npx cypress run --spec "cypress/e2e/CreateUser.cy.js"
```

---

## CI Pipeline

Tests run automatically on every push and pull request to `main` via GitHub Actions (`.github/workflows/cypress_test.yml`).

If any test fails, screenshots and videos are uploaded as artifacts for inspection.

---

## Test Data

The `EditUser` and `CreateUser` suites use the username `testuser001`.

- **CreateUser** deletes `testuser001` via API in `before()` so TC03 can always create it from scratch.
- **EditUser** always deletes and recreates `testuser001` via API in `before()` with a known state (role: Admin, status: Enabled), and deletes it in `after()` to keep the environment clean.

> Both suites are idempotent — they can be run any number of times in any order without manual cleanup.
