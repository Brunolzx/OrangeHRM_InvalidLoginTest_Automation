// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Clears cookies, visits the app, logs in as Admin, and waits for the Dashboard.
// Used by EditUser and CreateUser test suites (cy.login / cy.loginAsAdmin).
Cypress.Commands.add('login', () => {
  // Clear cookies, sessionStorage and localStorage so OrangeHRM does not redirect
  // to a previously visited URL (returnUrl) instead of the dashboard after login.
  cy.clearAllCookies();
  cy.clearAllSessionStorage();
  cy.clearLocalStorage();
  cy.visit('/');
  cy.get('input[name="username"]').clear().type('Admin');
  cy.get('input[name="password"]').clear().type('admin123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('loginAsAdmin', () => cy.login());
