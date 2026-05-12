import AdminPage from '../Pages/AdminPage';
import AddUserPage from '../Pages/AddUserPage';

describe('US04 - Create User', () => {

  // SETUP — Deletes testuser001 via API before the suite runs so TC03 can always
  // create it from scratch. Without this, a leftover user from a previous failed run
  // would cause TC03 to fail with "Already exists" instead of showing a success toast.
  before(() => {
    cy.loginAsAdmin();

    cy.request({
      method: 'GET',
      url: '/web/index.php/api/v2/admin/users?username=testuser001',
      failOnStatusCode: false
    }).then(res => {
      if (res.body.data.length > 0) {
        cy.request({
          method: 'DELETE',
          url: '/web/index.php/api/v2/admin/users',
          body: { ids: [res.body.data[0].id] }
        });
      }
    });
  });

  beforeEach(() => {
    cy.loginAsAdmin();
  });

  // TC01 — Access the create user functionality
  it('TC01 - Should allow access to the create user functionality', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    AddUserPage.pageTitle().should('contain', 'Add User'); // Verify the page contains "Add User"
    AddUserPage.usernameInput().should('be.visible'); // Verify the Username field is present
    AddUserPage.passwordInput().should('be.visible'); // Verify the Password field is present
    AddUserPage.userRoleDropdown().should('be.visible'); // Verify the User Role dropdown is present
  });

  // TC02 — Validate required fields
  it('TC02 - Should require all mandatory fields to be filled in', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    AddUserPage.clickSave(); // Click "Save" without filling in any field

    AddUserPage.errorMessages().should('contain', 'Required'); // Verify the error message contains "Required"
  });

  // TC03 — Create a user successfully
  it('TC03 - Should create a user successfully when all fields are valid', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    // Fill in all fields with valid data using the fillForm helper method
    AddUserPage.fillForm(
      'Admin',        // User Role
      'Enabled',      // Status
      'John',         // Employee Name
      'testuser001',  // Username
      'testuser001!', // Password
      'testuser001!'  // Confirm Password
    );

    AddUserPage.clickSave();

    // Verify a success notification appears after clicking Save
    AddUserPage.successToast().should('be.visible');

    // Verify the URL has changed back to the user list page
    cy.url().should('include', '/viewSystemUsers');

    // Verify the new user appears in the list
    AdminPage.tableRows().should('contain', 'testuser001');
  });

  // TC04 — Prevent creation with an invalid username (fewer than 5 characters)
  it('TC04 - Should prevent creation of a user with an invalid username', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    // Fill in the form with an invalid username
    AddUserPage.fillForm(
      'Admin',
      'Enabled',
      'John',
      'user',         // "Should be at least 5 characters" error is expected for this value
      'testuser001!',
      'testuser001!'
    );

    AddUserPage.clickSave();

    // Verify the error message appears on the Username field
    AddUserPage.errorMessages().should('be.visible');

    // Verify the URL still contains "saveSystemUser", meaning the user is still on the Add User page
    cy.url().should('include', '/saveSystemUser');
  });

  // TC05 — Prevent creation with an already existing username
  it('TC05 - Should prevent creation of a user with an already existing username', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    // Fill in the form the same way as TC03
    AddUserPage.fillForm(
      'Admin',
      'Enabled',
      'John',
      'testuser001',  // Expected to return the "Already exists" error message
      'testuser001!',
      'testuser001!'
    );

    AddUserPage.clickSave();

    // Verify the "Already exists" error message appears on the Username field
    AddUserPage.errorMessages().should('contain', 'Already exists');

    // Verify the URL remains on the Add User page
    cy.url().should('include', '/saveSystemUser');
  });

  // TC06 — Prevent creation with an invalid password
  it('TC06 - Should prevent creation of a user with an invalid password', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    AddUserPage.fillForm(
      'Admin',
      'Enabled',
      'John',
      'testuser001',
      'password',     // Invalid — no uppercase letter or special character
      'password'
    );

    AddUserPage.clickSave();

    // Verify the error message appears on the Password field
    AddUserPage.errorMessages().should('be.visible');

    // Verify the URL remains on the Add User page
    cy.url().should('include', '/saveSystemUser');
  });

  // TC07 — Verify searching for an existing user
  it('TC07 - Should display the user matching the searched username', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users

    // Search by username only — sufficient to uniquely identify testuser001 and avoids
    // Vue re-render issues that can clear the username field after dropdown interactions
    AdminPage.searchUser('testuser001');

    // Verify only one row appears in the results table
    AdminPage.tableRows().should('have.length', 1);

    // Verify the first (and only) row contains the correct Username
    AdminPage.tableRows().first().should('contain', 'testuser001');

    // Verify the row also contains the correct User Role
    AdminPage.tableRows().first().should('contain', 'Admin');

    // Verify the row also contains the correct Status
    AdminPage.tableRows().first().should('contain', 'Enabled');
  });

  // TC08 — Cancel the creation of a user
  it('TC08 - Should cancel the creation and redirect to the user list', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    AddUserPage.clickCancel(); // Click "Cancel" without filling in any field

    // Verify that after cancelling, the app redirects to the user list
    cy.url().should('include', '/viewSystemUsers');
  });

  // TC09 — Passwords do not match
  it('TC09 - Should show an error when the passwords do not match', () => {
    AdminPage.navigateToAdminUsers(); // Navigate to Admin > User Management > Users
    AdminPage.clickAdd(); // Click the "Add" button to open the Add User form

    // Fields are filled individually here because the passwords are different,
    // so the fillForm helper (which takes a single password value) cannot be used
    AddUserPage.selectUserRole('Admin');
    AddUserPage.selectStatus('Enabled');
    AddUserPage.typeEmployeeName('John');
    AddUserPage.typeUsername('testuser001');
    AddUserPage.typePassword('testuser001!');
    AddUserPage.typeConfirmPassword('testuser01!'); // Different password

    AddUserPage.clickSave();

    // Verify the "Passwords do not match" message appears on the page
    AddUserPage.errorMessages().should('contain', 'Passwords do not match');

    // Verify the page is still "Add User", meaning the app blocked the creation
    AddUserPage.pageTitle().should('contain', 'Add User');
  });

});
