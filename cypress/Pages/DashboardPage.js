class DashboardPage {

  elements = {

    // Page title shown in the top breadcrumb bar after login
    dashboardTitle: () => cy.get('.oxd-topbar-header-breadcrumb h6'),

    // User avatar / name button that opens the dropdown menu
    userDropdown: () => cy.get('.oxd-userdropdown-tab'),

    // Profile image inside the user dropdown tab
    userProfileImage: () => cy.get('.oxd-userdropdown-tab img'),

    // Username text shown next to the profile image
    userInfo: () => cy.get('.oxd-userdropdown-name'),

    // "Logout" link inside the user dropdown menu
    logoutLink: () => cy.contains('.oxd-userdropdown-link', 'Logout'),

    // Left-side navigation menu
    dashboardMenu: () => cy.get('.oxd-main-menu'),

    // Individual items in the left-side navigation menu
    dashboardMenuItems: () => cy.get('.oxd-main-menu').find('li'),

  }

  // Asserts the user has landed on the Dashboard after login
  verifyDashboardIsVisible() {
    cy.url().should('include', '/dashboard');
    this.elements.dashboardTitle().should('be.visible').and('contain.text', 'Dashboard');
  }

  // Opens the user dropdown in the top-right corner
  clickUserDropdown() {
    this.elements.userDropdown().click();
  }

  // Clicks the Logout option inside the user dropdown — waits for the link to be
  // visible so the dropdown animation has completed before Cypress interacts with it
  clickLogout() {
    this.elements.logoutLink().should('be.visible').click();
  }

  // Convenience method: opens the dropdown and clicks Logout in one call
  logout() {
    this.clickUserDropdown();
    this.clickLogout();
  }

}

export default new DashboardPage();
