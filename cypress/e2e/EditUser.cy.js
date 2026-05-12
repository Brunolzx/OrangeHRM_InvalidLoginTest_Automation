import AdminPage from '../Pages/AdminPage';

describe('US05 - Edit User', () => {

  // SETUP — Ensures testuser001 exists with the correct initial state before any test runs.
  //
  // Reason: the OrangeHRM site is shared and users created manually often
  // disappear. Managing via API in before() guarantees that anyone (beyond
  // localhost) can run the tests without any manual setup.
  //
  // Why always delete + recreate (instead of only creating if missing):
  // A previous run may have left testuser001 in a modified state (e.g. role = ESS)
  // if a test failed mid-way and the restore step did not complete. Always deleting
  // and recreating guarantees a clean, known starting state regardless of history.
  //
  // Why cy.login() instead of manual login logic:
  // cy.login() already handles cy.clearAllCookies() + cy.visit() + credentials +
  // wait for the dashboard. Duplicating that logic here caused failures in after()
  // because cy.visit('/auth/login') redirected to the dashboard (active session)
  // and input[name="username"] was not found.
  //
  // Flow:
  //   1. Login via cy.login() (clears cookies + authenticates via browser)
  //   2. Fetch the "Employee Name" of "John" dynamically via API ("John" is used
  //      for these tests as it is the most stable name for autocomplete fill)
  //   3. Delete the user if it already exists (ensures a clean state regardless of previous runs)
  //   4. Always create fresh with the correct initial data
  before(() => {
    // Step 1: Login using the existing command — ensures an authenticated session
    // consistently with beforeEach, without duplicating logic
    cy.login();

    // Step 2: Fetch the "Employee Name" of "John" dynamically via API
    // (the session cookie from cy.login() is shared with cy.request())
    cy.request('/web/index.php/api/v2/pim/employees?nameOrId=John&includeEmployees=onlyCurrent')
      .then(res => {
        const empNumber = res.body.data[0].empNumber;

        // Step 3: Delete the user if it exists, then always recreate in step 4
        cy.request({
          method: 'GET',
          url: '/web/index.php/api/v2/admin/users?username=testuser001',
          failOnStatusCode: false
        }).then(checkRes => {

          const createUser = () => {
            // Step 4: Create fresh with known role (Admin) and status (Enabled)
            cy.request({
              method: 'POST',
              url: '/web/index.php/api/v2/admin/users',
              body: {
                username:   'testuser001',
                password:   'testuser001!',
                status:     true,       // true = Enabled
                empNumber:  empNumber,
                userRoleId: 1           // 1 = Admin, 2 = ESS
              }
            });
          };

          if (checkRes.body.data.length > 0) {
            cy.request({
              method: 'DELETE',
              url: '/web/index.php/api/v2/admin/users',
              body: { ids: [checkRes.body.data[0].id] }
            }).then(() => createUser());
          } else {
            createUser();
          }
        });
      });
  });

  // Delete the user via API after all tests have finished.
  //
  // Keeps the environment clean and ensures the next test run always
  // starts with the user in the correct state (re-created by before()).
  after(() => {
    // Login using the existing command — cy.login() calls cy.clearAllCookies()
    // before visiting the page, ensuring there is no redirect to the dashboard
    // even if the session from the last beforeEach is still active
    cy.login();

    // Fetch the internal user ID so it can be deleted via API
    cy.request('/web/index.php/api/v2/admin/users?username=testuser001')
      .then(res => {
        if (res.body.data.length > 0) {
          const userId = res.body.data[0].id;

          cy.request({
            method: 'DELETE',
            url: '/web/index.php/api/v2/admin/users',
            body: { ids: [userId] }
          });
        }
      });
  });

  // BEFORE EACH — Logs in and navigates to the edit page before each TC
  beforeEach(() => {
    cy.login();
    AdminPage.navigateToUsers();
    AdminPage.searchAndEditUser('testuser001');
  });


  // TEST CASES

  // GIVEN that the ADMIN is already logged in and is on the "Admin" page


  // TC01 — Access the edit functionality / page
  it('TC01 - Access the edit user page successfully', () => {
    cy.url().should('include', '/admin/saveSystemUser');
  });

  // TC02 — View the user's current data
  it("TC02 - Validate the user's current data", () => {
    AdminPage.userRoleValue.should('contain.text', 'Admin');
    AdminPage.statusValue.should('contain.text', 'Enabled');
    AdminPage.employeeNameInput.should('contain.value', 'John');
    AdminPage.usernameInput.should('have.value', 'testuser001');
  });

  // TC03 — Edit the user's role successfully.
  // Restores the original role at the end to not affect the following tests.
  it("TC03 - Edit User's Role successfully", () => {
    AdminPage.selectUserRole('ESS');
    AdminPage.save();
    AdminPage.successToast.should('be.visible');

    // Restore original role (Admin) to keep the user in a consistent state.
    // navigateToUsers() forces a full cy.visit() so Vue re-initialises its keyboard
    // event handlers before searchAndEditUser tries to type in the search field.
    AdminPage.navigateToUsers();
    AdminPage.searchAndEditUser('testuser001');
    AdminPage.selectUserRole('Admin');
    AdminPage.save();
  });

  // TC04 — Edit the user's status successfully.
  // Restores the original status at the end to not affect the following tests.
  it("TC04 - Edit User's Status successfully", () => {
    AdminPage.selectStatus('Disabled');
    AdminPage.save();
    AdminPage.successToast.should('be.visible');

    // Restore original status (Enabled) to keep the user in a consistent state.
    // navigateToUsers() forces a full cy.visit() so Vue re-initialises its keyboard
    // event handlers before searchAndEditUser tries to type in the search field.
    AdminPage.navigateToUsers();
    AdminPage.searchAndEditUser('testuser001');
    AdminPage.selectStatus('Enabled');
    AdminPage.save();
  });

  // TC05 — Change the password with valid data
  it("TC05 - Edit the User's Password successfully", () => {
    AdminPage.enableChangePassword();
    AdminPage.setPassword('testuser001!', 'testuser001!');
    AdminPage.save();
    AdminPage.successToast.should('be.visible');
  });

  // TC06 — Prevent saving when the required Username field is empty
  it("TC06 - Don't allow the system to save the new data with required fields empty", () => {
    AdminPage.clearUsername();
    AdminPage.save();
    AdminPage.errorMessages.should('be.visible');
  });

  // TC07 — Prevent saving when the password does not match the confirm password field
  it("TC07 - Don't allow the system to save the new data if the passwords don't match", () => {
    AdminPage.enableChangePassword();
    AdminPage.setPassword('testuser001!', 'differentPassword!');
    AdminPage.save();
    AdminPage.errorMessages.should('be.visible');
  });

});
