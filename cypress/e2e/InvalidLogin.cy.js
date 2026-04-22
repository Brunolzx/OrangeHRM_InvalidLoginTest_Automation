import LoginPage from '../Pages/LoginPage';

describe('US02 - Invalid Login', () => {

  beforeEach(() => {

    LoginPage.visit();

  });

  it('TC01 - Login test with invalid credentials on both fields', () => {

    LoginPage.fillUsername('User');
    LoginPage.fillPassword('pass123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();
    
  });

  it('TC02 - Login test with valid "Username" credentials and invalid "Password"', () => {

    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('pass123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC03 - Login test with invalid "Username" credentials and valid "Password"', () => {

    LoginPage.fillUsername('User');
    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC04 - Login test with an empty "Username" field', () => {

    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();
    LoginPage.verifyRequiredUsernameMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC05 - Login test with an empty "Password" field', () => {

    LoginPage.fillUsername('Admin');
    LoginPage.clickLogin();
    LoginPage.verifyRequiredPasswordMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC06 - Login test with both fields empty', () => {

    LoginPage.clickLogin();
    LoginPage.verifyRequiredUsernameMessage();
    LoginPage.verifyRequiredPasswordMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC07 - Login testing the "Username" field with case sensitivity', () => {

    LoginPage.fillUsername('admin');
    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC08 - Login testing the "Password" field with case sensitivity', () => {

    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('Admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC09 - Login testing both fields with case sensitivity', () => {

    LoginPage.fillUsername('admin');
    LoginPage.fillPassword('Admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC10 - Login testing the "Username" field with only Upper Cases', () => {

    LoginPage.fillUsername('ADMIN');
    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC11 - Login testing the "Password" field with only Upper Cases', () => {

    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('ADMIN123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC12 - Login testing both fields with only Upper Cases', () => {

    LoginPage.fillUsername('ADMIN');
    LoginPage.fillPassword('ADMIN123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();

  });

  it('TC13 - Login testing the "Username" field with extra spacing', () => {

    LoginPage.fillUsername(' Admin ');
    LoginPage.fillPassword('admin123');
    LoginPage.clickLogin();
    LoginPage.verifyInvalidCredentialsMessage();
    LoginPage.verifyUserRemainsOnLoginPage();
    
  });

});