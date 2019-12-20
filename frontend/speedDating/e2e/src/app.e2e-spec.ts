import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Welcome');
  });

  it ('should display register button', () => {
    page.navigateTo();
    expect(page.getRegisterButton().isPresent()).toBe(true);
  });

  it('should be clickable - register button', () => {
    page.navigateTo();
    expect(page.getRegisterButton().isEnabled()).toBe(true);
  });

  it('should have text being equal to register', () => {
    page.navigateTo();
    page.getRegisterButton().click();
    expect(page.getRegisterText()).toEqual('Register');
  });

  it('should route register - page', () => {
    page.navigateTo();
    page.getRegisterButton().click();
    expect(page.getRegisterText()).toEqual('Register');
  });

  it('should contain submit button on login-page', () => {
    page.navigateTo();
    expect(page.getSubmitButton().isPresent()).toBe(true);
  });

  it('should login user', () => {
    page.navigateTo();
    page.loginUsername();
    page.loginPassword();
    page.getSubmitButton().click();
    expect(page.getProfile().getText()).toEqual('Your profile');
  });

  it ('should redirect to Chat Room', () => {
    page.navigateToProfile();
    page.getChatButton().click();
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
