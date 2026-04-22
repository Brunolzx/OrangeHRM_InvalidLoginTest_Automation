# OrangeHRM Test Automation & Manual Testing documentation 🚀

This repository contains a project for the OrangeHRM website. It includes both Manual Test Cases and Automated (E2E) Tests using Cypress.

## Project: Invalid Login
The main focus of this project is to test invalid login scenarios. The goal is to ensure the system correctly prevents unauthorized access and provides appropriate feedback for:
 - Incorrect credentials (username/password).
 - Empty fields validation.
 - Case sensitivity (Username and Password).
 - Input spacing issues.

# Test Framework: Cypress
# Design Pattern: Page Object Model (POM)
# Documentation: Test case document; Evidence Report; Improvement Report; Bug Report.

## 📂 Project Structure

```text
├── cypress/
│   ├── e2e/         
│   ├── pages/         
│   └── fixtures/      
├── docs/
│   └── manual-tests/  
├── cypress.config.js 
└── package.json      
