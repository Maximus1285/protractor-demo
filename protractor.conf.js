const chrome = require('./src/config/capabilities/chrome');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const reportsDir = path.join(process.cwd(), './reports/protractor-e2e');
const jsonReportsDir = path.join(process.cwd(), './reports/protractor-e2e/json');
const targetOutputDir = reportsDir + '/e2e';

function createDirectory(dir, empty = false) {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  } else if (empty) {
    rimraf(dir + '/*', () => console.log('emptied ' + dir));
  }
}

createDirectory(jsonReportsDir);
createDirectory(targetOutputDir);

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://qaclickacademy.github.io/protocommerce',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: chrome,
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options:{
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      jsonOutputPath: jsonReportsDir,
      reportPath: targetOutputDir,
      reportName: 'End-to-End Tests Result',
      displayDuration: true,
      durationInMS: true,
      pageTitle: 'Protractor-Cucumber Report',
      removeOriginalJsonReportFile: true
    }
  }],
  specs: ['./src/features/**/*.feature'],
  allScriptsTimeout: 15000,
  defaultTimeout: 15000,
  getPageTimeout: 15000,
  ignoreUncaughtExceptions: true,

  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    format: ['json:' + jsonReportsDir + '/cucumber_report.json', 'progress'],
    'format-options': '{"colorsEnabled": true}',
    backtrace: true,
    tags: ['~@not-run'],
    require: [
      './src/steps/**/*.steps.ts',
      './src/core/support/hooks.ts'
    ]
  },

  SELENIUM_PROMISE_MANAGER: false,

  onPrepare: function() {
    browser.driver.manage().window().setSize(1650, 1000);
    require('ts-node').register({
      project: path.join(__dirname, './tsconfig.e2e.json')
    });
  }
};
