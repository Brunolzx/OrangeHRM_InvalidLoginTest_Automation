class LoginPage {

  elements = {

    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    invalidCredentialsAlert: () => cy.get('.oxd-alert-content-text'),
    inputErrorMessage: () => cy.get('.oxd-input-field-error-message'),

  }

  visit() {

    cy.visit('/');

  }

  fillUsername(username) {
    if (username) {
      this.elements.usernameInput().clear().type(username);
    }
  }

  fillPassword(password) {
    if (password) {
      this.elements.passwordInput().clear().type(password);
    }
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }


  verifyInvalidCredentialsMessage() {
    this.elements.invalidCredentialsAlert().should('be.visible').and('contain.text', 'Invalid credentials');
  }

  verifyRequiredUsernameMessage() {
    this.elements.usernameInput().closest('.oxd-input-group').find('.oxd-input-field-error-message')
      .should('be.visible').and('contain.text', 'Required');
  }

  verifyRequiredPasswordMessage() {
    this.elements.passwordInput().closest('.oxd-input-group').find('.oxd-input-field-error-message')
      .should('be.visible').and('contain.text', 'Required');
  }

  verifyUserRemainsOnLoginPage() {
    cy.url().should('include', '/auth/login');
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
  }
}

export default new LoginPage();