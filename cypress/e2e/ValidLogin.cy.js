import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';

describe('US01 - Valid Login', () => {

  beforeEach(() => {

    // Navigate to the login page before each test
    LoginPage.visit();

  });

  it('TC01 - Login with valid credentials using individual field methods', () => {

    // Fill each field separately and click login
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();

    // Verify the user is redirected to the Dashboard
    LoginPage.verifySuccessfulLogin();
    DashboardPage.verifyDashboardIsVisible();

  });

  it('TC02 - Login with valid credentials using the login() helper method', () => {

    // Use the combined login() helper to fill both fields and submit
    LoginPage.login('Admin', 'admin123');

    // Verify the user is redirected to the Dashboard
    LoginPage.verifySuccessfulLogin();
    DashboardPage.verifyDashboardIsVisible();

  });

  it('TC03 - Verify the Dashboard URL is correct after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // The URL should include /dashboard after a successful login
    cy.url().should('include', '/dashboard');

  });

  it('TC04 - Verify the user dropdown is visible after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // The user dropdown in the top-right corner must be visible after login
    DashboardPage.elements.userDropdown().should('be.visible');

  });

  it('TC05 - Verify the user profile image is visible after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // The user profile image should be visible on the Dashboard after login
    DashboardPage.elements.userProfileImage().should('be.visible');

  });

  it('TC06 - Verify the correct user information is displayed after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // The username shown in the top-right corner must be visible and non-empty
    DashboardPage.elements.userInfo().should('be.visible').invoke('text').should('not.be.empty');

  });

  it('TC07 - Verify the user can access the Dashboard navigation menu after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // The left-side navigation menu should be visible and populated
    DashboardPage.elements.dashboardMenu().should('be.visible');
    DashboardPage.elements.dashboardMenuItems().should('have.length.greaterThan', 0);

  });

  it('TC08 - Verify the user can log out successfully after a valid login', () => {

    LoginPage.login('Admin', 'admin123');

    // Log out using the user dropdown
    DashboardPage.logout();

    // Verify the user is redirected back to the login page
    cy.url().should('include', '/login');
    LoginPage.elements.loginButton().should('be.visible');

  });

});
