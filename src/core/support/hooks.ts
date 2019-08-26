import { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';

BeforeAll(async () => setDefaultTimeout(35 * 1000));

After(async function (stepResult) {
  if (stepResult.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(screenshot => {
      const decodedImage = new Buffer(screenshot, 'base64').toString('base64');
      return this.attach(decodedImage, 'image/png');
    });
  }
});
