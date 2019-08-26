import { Locator } from './../../config/locators/locator';
import { UserBot } from './../bots/bots.user-bot';
import { element, by } from 'protractor';
import { Shop } from './page.object.shop';

export class HomePage {

  private readonly SHOP = 'Shop';

  constructor(private readonly userBot: UserBot) {}

  public async goToShop(): Promise<Shop> {
    await this.userBot.navigateTo('/');
    await this.userBot.clickOn(element(by.cssContainingText(Locator.topMenuOptions, this.SHOP)));
    return new Shop(this.userBot);
  }
}
