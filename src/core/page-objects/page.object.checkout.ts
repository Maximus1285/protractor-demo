import { Locator } from './../../config/locators/locator';
import { UserBot } from '../bots/bots.user-bot';
import { $, element, by } from 'protractor';

export class Checkout {

  constructor(private readonly userBot: UserBot) {}

  public async includesProduct(product: string): Promise<boolean> {
    const pageSource = await this.userBot.getPageSource();
    return pageSource.includes(product);
  }

  public async removeProduct(product: string): Promise<void> {
    const remove = element(by.cssContainingText(Locator.checkoutProducts, product)).$(Locator.removeButton);
    await this.userBot.clickOn(remove);
  }
}
