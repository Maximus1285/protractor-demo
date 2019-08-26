import { ElementFinder } from 'protractor/built/element';
import { browser, protractor } from 'protractor';
import { promise } from 'selenium-webdriver';

export abstract class BaseBot {

  private readonly timeOutMessage = 'Timed out waiting for element with selector: ';
  private readonly scrollIntoView =
    'arguments[0].scrollIntoView({behavior: "instant", block: "center", inline: "center"});';

  /**
   * Types the given URL received by parameter in the browser direction bar and hits enter
   * @param {string} url The specific URL to navigate to
   * @returns {promise.Promise<any>} Promise that will be resolved with any object
   */
  public async navigateTo(url: string): Promise<any> {
    return browser.get(browser.baseUrl.concat(url));
  }

  /**
   * Gets the current page view source code
   * @returns {promise.Promise<string>} A Promise that will be resolved with the page source code as text
   */
  public async getPageSource(): Promise<string> {
    return browser.getPageSource();
  }

  /**
   * Waits for a given number of seconds. By default it'll wait for 2 seconds
   * @param {number} time Number of seconds to wait
   * @returns {promise.Promise<void>} Promise that will be resolved with a void
   */
  public async waitFor(time: number = 2): Promise<void> {
    return browser.sleep(time * 1000);
  }

  /**
   * Waits until an element is present in the DOM
   * @param {ElementFinder} element Web Element to wait for
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntilIsPresent(element: ElementFinder, timout?: number): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.presenceOf(element),
      this.timeOutMessage.concat(element.locator()),
      timout);
  }

  /**
   * Waits until a given web element is clickable
   * @param {ElementFinder} element Web Element to wait until it's clickable
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntilClickable(element: ElementFinder, timeout?: number): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.elementToBeClickable(element),
      this.timeOutMessage.concat(element.locator()),
      timeout);
  }

  /**
   * Waits until a given web element gets visible
   * @param {ElementFinder} element Web Element to wait until visible
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntilVisible(element: ElementFinder, timout?: number): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.visibilityOf(element),
      this.timeOutMessage.concat(element.locator()),
      timout);
  }

  /**
   * Waits until a given web element is no longer visible
   * @param {ElementFinder} element Web Element to wait until is not visible
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntilNotVisible(element: ElementFinder, timout?: number): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.invisibilityOf(element),
      this.timeOutMessage.concat(element.locator()),
      timout);
  }

  /**
   * Waits until the URL contains a given string text
   * @param {string} text Text to search in the URL
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntilUrlContains(text: string, timout?: number): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.urlContains(text),
      `Timed out waiting for Url to contain: ${text}`,
      timout);
  }

  /**
   * Waits until text is present on a given element
   * @param element WebElement to check
   * @param text Expected text to be present
   */
  public async waitUntilTextisPresentOn(element: ElementFinder, text: string, timout?): Promise<{}> {
    return this.waitUntil(
      protractor.ExpectedConditions.textToBePresentInElement(element, text),
      `Timed out waiting for Text: "${text}" to be present on element provided`,
      timout);
  }

  /**
   * Waits until a given element becomes stale in the DOM
   * @param element WebElement to verify
   * @param timeout Time to wait, if this is not specified, then it'll use the default timeout configured
   */
  public async waitForStalenessOf(element: ElementFinder, timeout?: number) {
    return this.waitUntil(
      protractor.ExpectedConditions.stalenessOf(element),
      'Timed out waiting for the element to be stale',
      timeout);
  }

  /**
   * Waits until a given condition is true (protractor.ExpectedConditions). It will wait up to 5 seconds
   * @param {Function | promise.Promise<{}>} condition  ExpectedCondition function to wait for
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async waitUntil(
    condition: Function | promise.Promise<{}>, message: string, timout?: number): Promise<{}> {
    return browser.wait(condition, (timout * 1000) || browser.allScriptsTimeout, message);
  }

  /**
   * Scrolls to a given web element so it gets visible to interact with
   * @param {ElementFinder} element The web element to scroll to
   * @returns {promise.Promise<{}>} Promise that will be resolved with an empty object
   */
  public async scrollTo(element: ElementFinder): Promise<{}> {
    return await element
      .getWebElement()
      .catch()
      .then(webElement => browser.executeScript(this.scrollIntoView, webElement));
  }
}
