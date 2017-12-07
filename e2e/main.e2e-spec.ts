import { AppPage } from './app.po';
import {browser, element, by}from 'protractor';

describe('Test Main Page ', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Create new article and validate article appears in feed', () => {
    page.navigateTo();
    element(by.id('protractor13')).click();
    element(by.id('protractor1')).sendKeys("name");
    element(by.id('protractor2')).sendKeys("name");
    element(by.id('protractor3')).sendKeys("name@rice.edu");
    element(by.id('protractor4')).sendKeys("1234567890");
    element(by.id('protractor5')).sendKeys("1/1/1998");
    element(by.id('protractor6')).sendKeys("77005");
    element(by.id('protractor7')).sendKeys("123-123-123");
    element(by.id('protractor8')).sendKeys("123-123-123");
    expect(element(by.id('protractor9')).isEnabled()).toBe(true)
  });

  it('should login as test user', () => {
    page.navigateTo();
    // element(by.id('protractor14')).click();
    element(by.id('protractor10')).sendKeys("ab12");
    element(by.id('protractor11')).sendKeys("abc-abc-abc");
    element(by.id('protractor12')).click();
    expect(browser.getCurrentUrl()).toContain('main');
  });

});
