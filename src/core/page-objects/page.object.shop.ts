import { Checkout } from './page.object.checkout';
import { Locator } from './../../config/locators/locator';
import { UserBot } from './../bots/bots.user-bot';
import { element, by, $ } from 'protractor';

export class Shop {

  constructor(private readonly userBot: UserBot) {}

  public async addProductToCart(productName: string): Promise<void> {
    const product = element(by.cssContainingText(Locator.products, productName));
    await this.userBot.clickOn(product.$(Locator.addButton));
  }

  public async getCheckoutButtonText(): Promise<string> {
    return await $(Locator.checkoutButton).getText();
  }

  public async goToCheckout(): Promise<Checkout> {
    await this.userBot.clickOn($(Locator.checkoutButton));
    return new Checkout(this.userBot);
  }
}
