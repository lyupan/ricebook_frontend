import { AppPage } from './app.po';
import {browser, element, by}from 'protractor';

describe('Rice Book E2E Test ', () => {
  let page: AppPage = new AppPage();

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  it('should be able to register a new user', () => {
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

  it('Create new article and validate article appears in feed', () => {
  	let content = "this is my test article!";
    element(by.id('protractor1')).click();
    element(by.id('newArticle')).sendKeys(content);
    element(by.id('protractor3')).click();
    expect(element.all(by.id('protractor4')).get(0).getText()).toEqual(content);
  });

  it('Edit an article and validate changed article text', () => {
  	let content = "Test edit an article";
    element.all(by.id('protractor5')).get(0).click();
    element.all(by.id('protractor4')).get(0).clear();
    element.all(by.id('protractor4')).get(0).sendKeys(content);
    element.all(by.id('protractor5')).get(0).click();
    expect(element.all(by.id('protractor4')).get(0).getText()).toEqual(content);
  });

  it('Update headline headline and verify change', () => {
  	let headline = "Update headline";
  	element(by.id('protractor7')).clear();
  	element(by.id('protractor7')).sendKeys(headline);
  	element(by.id('protractor8')).click();
    expect(element(by.id('protractor6')).getText()).toEqual(headline);
  });

  it('Add a Follower user and verify following count increases by one', () => {
  	let follow = "Rebecca";
  	let count = 0;
  	element.all(by.id('protractor11')).count().then(a => {
  		count = a + 1;
  		element(by.id('protractor9')).clear();
  		element(by.id('protractor9')).sendKeys(follow);
  		element(by.id('protractor10')).click();
  		expect(element.all(by.id('protractor11')).count()).toEqual(count);
  	});
  });

  it('Remove the Follower user and verify following count decreases by one', () => {
  	let count = 0;
  	element.all(by.id('protractor11')).count().then(a => {
  		count = a - 1;
  		element.all(by.id('protractor12')).get(0).click();
  		expect(element.all(by.id('protractor11')).count()).toEqual(count);
  	});
  });

  it('Search for Only One Article Like This and verify only one article shows, and verify the author', () => {
  	let content = "article";
  	element(by.id('protractor13')).clear();
	element(by.id('protractor13')).sendKeys(content);
	element(by.id('protractor14')).click();
	expect(element.all(by.id('protractor4')).count()).toEqual(1);
	expect(element.all(by.id('protractor15')).get(0).getText()).toEqual('ab12');
  });

  it('Navigate to the profile view, Update the users email and verify', () => {
	let email = "test@gmail.com"
	element(by.id('protractor16')).click();
	element(by.id('protractor2')).clear();
	element(by.id('protractor2')).sendKeys(email);
	element(by.id('protractor1')).click();
	expect(element(by.id('protractor3')).getText()).toEqual(email);
  });

  it('Update the users zipcode and verify', () => {
	let zipcode = "12345"
	element(by.id('protractor4')).clear();
	element(by.id('protractor4')).sendKeys(zipcode);
	element(by.id('protractor1')).click();
	expect(element(by.id('protractor5')).getText()).toEqual(zipcode);
  });

   it('Update the users password and verify', () => {
	let pwd = "345-345-345"
	element(by.id('protractor6')).clear();
	element(by.id('protractor6')).sendKeys(pwd);
	element(by.id('protractor7')).clear();
	element(by.id('protractor7')).sendKeys(pwd);
	element(by.id('protractor1')).click();
	let password = browser.executeScript('return JSON.parse(localStorage.getItem("user")).password');
	expect(password).toEqual(pwd);
  });

});
