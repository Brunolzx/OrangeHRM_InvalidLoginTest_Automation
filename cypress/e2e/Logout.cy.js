import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';

describe('US03 - Logout', () => {

  beforeEach(() => {

    // Perform a valid login before each test so the user starts on the Dashboard
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');
    DashboardPage.verifyDashboardIsVisible();

  });

  it('TC01 - Logout using the user dropdown menu', () => {

    // Open the user dropdown and click Logout
    DashboardPage.logout();

    // User must be redirected back to the login page
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC02 - Verify user cannot access the Dashboard after logout', () => {

    DashboardPage.logout();

    // Attempt to navigate directly to the Dashboard URL after logout
    cy.visit('/web/index.php/dashboard/index');

    // The application must redirect back to the login page, not show the Dashboard
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC03 - Verify the user dropdown is no longer visible after logout', () => {

    DashboardPage.logout();

    // After logout the user dropdown (only shown when authenticated) must not exist
    DashboardPage.elements.userDropdown().should('not.exist');

  });

  it('TC04 - Verify the user profile image is no longer visible after logout', () => {

    DashboardPage.logout();

    // After logout the user profile image (only shown when authenticated) must not exist
    DashboardPage.elements.userProfileImage().should('not.exist');

  });

  it('TC05 - Verify the URL is correct after logout', () => {

    DashboardPage.logout();

    // The URL should point to the login page after logout
    cy.url().should('include', '/auth/login');

  });

  it('TC06 - Verify the user can log in again after logout', () => {

    DashboardPage.logout();

    // Perform a valid login again after logout
    LoginPage.login('Admin', 'admin123');

    // The user should be able to log in successfully and see the Dashboard
    DashboardPage.verifyDashboardIsVisible();

  });

  it('TC07 - Verify the user can log out from any page in the application', () => {

    // Navigate to a different page (Admin) before logging out
    cy.visit('/web/index.php/admin/viewSystemUsers');

    // Log out using the user dropdown
    DashboardPage.logout();

    // Verify the user is redirected back to the login page
    LoginPage.verifyUserRemainsOnLoginPage();

  });

});
