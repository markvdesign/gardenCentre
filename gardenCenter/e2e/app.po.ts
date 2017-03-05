import { browser, element, by } from 'protractor';

export class GardenCenterPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gc-root h1')).getText();
  }
}
