class AddUserPage {

  // ─── SELECTORS ────────────────────────────────────────────────────────────

  pageTitle() {
    return cy.get('.orangehrm-main-title');
  }

  userRoleDropdown() {
    return cy.get('.oxd-select-text').eq(0);
  }

  statusDropdown() {
    return cy.get('.oxd-select-text').eq(1);
  }

  employeeNameInput() {
    return cy.get('.oxd-autocomplete-text-input input');
  }

  // Second regular input in the form (after Employee Name autocomplete)
  usernameInput() {
    return cy.get('.oxd-input').eq(1);
  }

  passwordInput() {
    return cy.get('input[type="password"]').eq(0);
  }

  confirmPasswordInput() {
    return cy.get('input[type="password"]').eq(1);
  }

  saveButton() {
    return cy.get('button[type="submit"]').contains('Save');
  }

  cancelButton() {
    return cy.get('button[type="button"]').contains('Cancel');
  }

  errorMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  successToast() {
    return cy.get('.oxd-toast--success');
  }

  // ─── ACTIONS ──────────────────────────────────────────────────────────────

  selectUserRole(role) {
    this.userRoleDropdown().click();
    cy.get('.oxd-select-option').contains(role).click();
  }

  selectStatus(status) {
    this.statusDropdown().click();
    cy.get('.oxd-select-option').contains(status).click();
  }

  // Intercepts the employee autocomplete API call before typing so Cypress does
  // not try to click the suggestion list before the server has responded.
  typeEmployeeName(name) {
    cy.intercept('GET', '**/employees?*').as('employeeSearch');
    this.employeeNameInput().clear().type(name, { delay: 100 });
    cy.wait('@employeeSearch').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-autocomplete-option', { timeout: 10000 }).should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
  }

  typeUsername(username) {
    this.usernameInput().type(username);
  }

  typePassword(password) {
    this.passwordInput().type(password);
  }

  typeConfirmPassword(password) {
    this.confirmPasswordInput().type(password);
  }

  clickSave() {
    this.saveButton().click();
  }

  clickCancel() {
    this.cancelButton().click();
  }

  // Fills all form fields in one call
  fillForm(userRole, status, employeeName, username, password, confirmPassword) {
    this.selectUserRole(userRole);
    this.selectStatus(status);
    this.typeEmployeeName(employeeName);
    this.typeUsername(username);
    this.typePassword(password);
    this.typeConfirmPassword(confirmPassword);
  }

}

export default new AddUserPage();
