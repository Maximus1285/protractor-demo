
module.exports = {
  browserName: 'chrome',
  maxInstances: 5,
  version: 'latest',
  shardTestFiles: true,
  chromeOptions: {
    args: [ '--headless' ]
  },
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'MacBook Pro 15',
    platform: {
      name: 'OSX',
      version: '10.14.6'
    }
  },
  loggingPrefs: {
    driver: 'ALL',
    server: 'ALL',
    browser: 'ALL'
  }
}
