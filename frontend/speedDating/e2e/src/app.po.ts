import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(by.css('app-root legend')).getText();
  }

  getSubmitButton() {
    return element (by.css('app-login [id="submit"]'));
  }

  getRegisterButton() {
    return element (by.css('[routerLink="/user"]'));
  }

  getRegisterText() {
    return element(by.css('app-register legend')).getText();
  }

  loginUsername() {
    element(by.css('app-login [id="username"]')).sendKeys('test');
  }
  loginPassword() {
    element(by.css('app-login [id="password"]')).sendKeys('123');
  }

  getProfile() {
    return element(by.css('app-profile-form h1'));
  }

  getChatButton() {
    return element (by.css('app-navbar [id="navbar-brand"]'));
  }

  navigateToProfile() {
    return browser.get('/profile');
  }

  getLobbyButton() {
    return element(by.css(('[id="send"]')));
  }
}
