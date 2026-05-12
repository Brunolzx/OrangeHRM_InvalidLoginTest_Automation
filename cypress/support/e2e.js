// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// The OrangeHRM application occasionally throws unhandled promise rejections
// (e.g. "Cannot read properties of undefined (reading 'response')") that are
// internal to the app and unrelated to the test under execution.
// Returning false prevents Cypress from failing tests due to these app-level errors.
Cypress.on('uncaught:exception', () => false);