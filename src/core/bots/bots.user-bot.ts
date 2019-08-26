import { ElementFinder } from 'protractor/built/element';
import { BaseBot } from './bots.base-bot';
import { browser } from 'protractor';

export class UserBot extends BaseBot {

  /**
   * Scrolls to element and clears it before entering text in a given text box
   * @param {ElementFinder} element Web element mapping the text box
   * @param {string} text The specified text to type in the text box
   * @return {promise.Promise<void>} Promise that will be resolved with a void
   */
  public async typeIn(element: ElementFinder, text: string): Promise<void> {
    await this.scrollTo(element);
    await element.clear();
    return await element.sendKeys(text);
  }

  /**
   * Performs a click action on a given web element
   * @param {ElementFinder} element The web element to click on
   * @returns {promise.Promise<void>} Promise that will be resolved with a void
   */
  public async clickOn(element: ElementFinder): Promise<void> {
    await this.waitUntilVisible(element);
    await this.scrollTo(element);
    return await element.click();
  }
}
