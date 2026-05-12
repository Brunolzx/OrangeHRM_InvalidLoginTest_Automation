<div align="center">

# OrangeHRM — Test Automation

[![CI](https://github.com/Brunolzx/OrangeHRM_Automation/actions/workflows/cypress_test.yml/badge.svg)](https://github.com/Brunolzx/OrangeHRM_Automation/actions/workflows/cypress_test.yml)
![Cypress](https://img.shields.io/badge/Cypress-15.14.0-17202C?style=flat&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Pattern](https://img.shields.io/badge/Pattern-Page_Object_Model-6DB33F?style=flat)

End-to-end test suite for the [OrangeHRM demo application](https://opensource-demo.orangehrmlive.com), built with **Cypress** using the **Page Object Model** pattern.

</div>

---

## Test Suites

| Suite | TCs | Coverage |
|-------|:---:|----------|
| US01 — Valid Login | 8 | Login with valid credentials · Dashboard verification |
| US02 — Invalid Login | — | Invalid/empty credentials · Case sensitivity · Spacing |
| US03 — Logout | 7 | Logout flow · Post-logout access control · Re-login |
| US04 — Create User | 9 | Create · Validate required fields · Duplicate · Cancel |
| US05 — Edit User | 7 | Edit role/status/password · Validation · API setup/teardown |

---

## Tech Stack

<div align="center">

| | Tool | Purpose |
|:-:|------|---------|
| <img src="https://raw.githubusercontent.com/cypress-io/cypress/develop/npm/cypress/assets/cypress-logo.png" width="20"/> | **Cypress** | E2E test framework |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20"/> | **JavaScript (ES6+)** | Test language |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20"/> | **Node.js** | Runtime |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="20"/> | **GitHub Actions** | CI/CD pipeline |

</div>

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── cypress_test.yml     # CI pipeline — runs on push/PR to main
├── cypress/
│   ├── e2e/
│   │   ├── ValidLogin.cy.js
│   │   ├── Logout.cy.js
│   │   ├── CreateUser.cy.js
│   │   └── EditUser.cy.js
│   ├── Pages/                   # Page Object Model
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── AdminPage.js
│   │   └── AddUserPage.js
│   └── support/
│       ├── commands.js          # cy.login() · cy.loginAsAdmin()
│       └── e2e.js               # Global config
├── .gitignore
├── cypress.config.js
└── package.json
```

---

## Setup & Run

**1. Install dependencies**
```bash
npm install
```

**2. Open Cypress (interactive mode)**
```bash
npx cypress open
```

**3. Run all tests (headless)**
```bash
npx cypress run
```

**4. Run a specific suite**
```bash
npx cypress run --spec "cypress/e2e/CreateUser.cy.js"
```

---

## CI/CD

Tests run automatically on every **push** and **pull request** to `main`.

If any test fails, **screenshots** and **videos** are uploaded as artifacts for inspection.

---

## Test Data

The `CreateUser` and `EditUser` suites share the test user `testuser001`, managed entirely via the OrangeHRM API:

- **CreateUser** — deletes `testuser001` before the suite runs so TC03 can always create it from scratch
- **EditUser** — always deletes and recreates `testuser001` with a known state (`role: Admin`, `status: Enabled`) before the suite, and cleans up after

> Both suites are **idempotent** — they can run any number of times, in any order, without manual cleanup.
