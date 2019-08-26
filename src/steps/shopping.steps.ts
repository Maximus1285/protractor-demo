import { Checkout } from './../core/page-objects/page.object.checkout';
import { Shop } from './../core/page-objects/page.object.shop';
import { HomePage } from './../core/page-objects/page.object.home';
import { Given, When, Then } from 'cucumber';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { UserBot } from '../core/bots/bots.user-bot';

const expect = chai.use(chaiAsPromised).expect;
const userBot = new UserBot();
const homePage = new HomePage(userBot);
let shopPage: Shop;
let checkOutPage: Checkout;

Given('I am at the ecommerce shop page', async () => shopPage = await homePage.goToShop());

When('I add an {string} to the shopping cart', async product => shopPage.addProductToCart(product));

Then('I verify the checkout button at the top shows the total items in the cart as 1', async () => {
  expect(await shopPage.getCheckoutButtonText()).to.contain(1)
});

When('I go to checkout view', async () => checkOutPage = await shopPage.goToCheckout());

Then('I verify the {string} info is shown', async product => {
  expect(await checkOutPage.includesProduct(product)).to.be.true;
});

When('I remove the {string} from the cart', async product => checkOutPage.removeProduct(product));

Then('I verify the {string} info is no longer shown', async product => {
  expect(await checkOutPage.includesProduct(product)).to.be.false;
});
