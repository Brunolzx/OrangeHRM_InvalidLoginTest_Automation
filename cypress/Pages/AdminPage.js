class AdminPage {

  // ─── SEARCH FORM SELECTORS ────────────────────────────────────────────────

  // First text input inside the search form (Username field)
  get usernameSearchInput() {
    return cy.get('form .oxd-input').first();
  }

  get searchButton() {
    return cy.contains('button', 'Search');
  }

  // All rows in the results table
  tableRows() {
    return cy.get('.oxd-table-body .oxd-table-row');
  }

  // ─── EDIT FORM SELECTORS ──────────────────────────────────────────────────

  // "User Role" dropdown — located by label to stay resilient to index changes
  get userRoleDropdown() {
    return cy.contains('.oxd-label', 'User Role')
      .parents('.oxd-input-group')
      .find('.oxd-select-text');
  }

  // Currently selected value in "User Role" (read-only — used in TC02)
  get userRoleValue() {
    return cy.contains('.oxd-label', 'User Role')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input');
  }

  get statusDropdown() {
    return cy.contains('.oxd-label', 'Status')
      .parents('.oxd-input-group')
      .find('.oxd-select-text');
  }

  get statusValue() {
    return cy.contains('.oxd-label', 'Status')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input');
  }

  get employeeNameInput() {
    return cy.get('.oxd-autocomplete-text-input input');
  }

  // "Username" input — located by label to avoid fragile index selectors
  get usernameInput() {
    return cy.contains('.oxd-label', 'Username')
      .parents('.oxd-input-group')
      .find('input.oxd-input');
  }

  // "Change Password" checkbox toggle (visually hidden — requires force:true to interact)
  get changePasswordToggle() {
    return cy.get('input[type="checkbox"]');
  }

  get passwordInput() {
    return cy.get('input[type="password"]').eq(0);
  }

  get confirmPasswordInput() {
    return cy.get('input[type="password"]').eq(1);
  }

  // Save button — .last() handles pages that render two secondary buttons
  get saveButton() {
    return cy.get('.oxd-button--secondary').last();
  }

  get successToast() {
    return cy.get('.oxd-toast--success');
  }

  get errorMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  // ─── NAVIGATION ──────────────────────────────────────────────────────────

  // Direct URL navigation — faster and more reliable than clicking through the menu
  navigateToUsers() {
    cy.visit('/web/index.php/admin/viewSystemUsers');
  }

  // Menu-driven navigation (Admin link → User Management → Users)
  navigateToAdminUsers() {
    cy.get('a.oxd-main-menu-item').contains('Admin').click();
    cy.get('.oxd-topbar-body-nav-tab').contains('User Management').click();
    cy.get('.oxd-topbar-body-nav-tab-link').contains('Users').click();
  }

  clickAdd() {
    cy.get('button').contains('Add').click();
  }

  // ─── SEARCH ACTIONS ───────────────────────────────────────────────────────

  // Fills the search form and submits. All params except username are optional.
  searchUser(username, role = null, employeeName = null, status = null) {
    this.usernameSearchInput.clear().type(username);

    if (role) {
      cy.get('.oxd-select-text').eq(0).click();
      cy.get('.oxd-select-option').contains(role).click();
    }

    if (employeeName) {
      // Type without intercepting — cy.wait catches the first keystroke request
      // which may return empty results. Waiting directly for the options is more reliable.
      cy.get('.oxd-autocomplete-text-input input').clear().type(employeeName, { delay: 100 });
      cy.get('.oxd-autocomplete-option', { timeout: 10000 }).should('be.visible');
      cy.get('.oxd-autocomplete-option').first().click();
    }

    if (status) {
      cy.get('.oxd-select-text').eq(1).click();
      cy.get('.oxd-select-option').contains(status).click();
    }

    this.searchButton.click();
  }

  // Clicks the edit (pencil) button on the first result row.
  // Selects by icon class rather than index to avoid accidentally clicking Delete.
  clickEditOnFirstResult() {
    cy.get('.oxd-table-body .oxd-table-row')
      .first()
      .find('button.oxd-icon-button:has(i.bi-pencil-fill)')
      .click();
  }

  searchAndEditUser(username) {
    this.searchUser(username);
    this.clickEditOnFirstResult();
  }

  // ─── EDIT FORM ACTIONS ────────────────────────────────────────────────────

  selectUserRole(role) {
    this.userRoleDropdown.click();
    cy.get('.oxd-select-option').contains(role).click();
    this.userRoleValue.should('contain.text', role);
  }

  selectStatus(status) {
    this.statusDropdown.click();
    cy.get('.oxd-select-option').contains(status).click();
    this.statusValue.should('contain.text', status);
  }

  // Intercepts the autocomplete API call before typing to avoid clicking the
  // suggestion list before the server has responded.
  selectEmployeeName(name) {
    cy.intercept('GET', '**/api/v2/pim/employees**').as('employeeSearch');
    this.employeeNameInput.clear().type(name, { delay: 100 });
    cy.wait('@employeeSearch');
    cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
  }

  // The toggle input is visually hidden by CSS, so force:true is required
  enableChangePassword() {
    this.changePasswordToggle.check({ force: true });
  }

  setPassword(password, confirmPassword) {
    this.passwordInput.type(password);
    this.confirmPasswordInput.type(confirmPassword);
  }

  clearUsername() {
    this.usernameInput.clear();
  }

  save() {
    this.saveButton.click();
  }

}

export default new AdminPage();
