require('dotenv').config()

const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// set the environment variable WEBDRIVER_AUTH if the selenium hub is protected by BASIC auth
const webdriverAuth = process.env.WEBDRIVER_AUTH
const host = webdriverAuth ? `${webdriverAuth}@${process.env.WEBDRIVER_HOST}` : process.env.WEBDRIVER_HOST

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: process.env.WEBDRIVER_URL || 'http://localhost',
      host,
      port: Number(process.env.WEBDRIVER_PORT),
      browser: 'chrome'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'gihyo-e2e',
  translation: 'ja-JP',
  plugins: {
    allure: {
      enabled: true,
    },
    stepByStepReport: {
      enabled: true,
      screenshotsForAllureReport: true,
    },
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    autoLogin: {
      enabled: true,
      saveToFile: false,
      users: {
        admin: {
          login: (I) => {
            const email = process.env.ADMIN_EMAIL
            const password = process.env.ADMIN_PASSWORD
            if (!email || !password) throw 'Env USERNAME or PASSWORD are null!!'
            I.amOnPage('https://craftzcat-neko.herokuapp.com/login')
            I.fillField('Email', email)
            I.fillField('Password', password)
            I.click('ログイン')
            I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/') // Sign inを押してから即移動しないため明示的にwait
          },
          check: (I) => {
            I.amOnPage('https://craftzcat-neko.herokuapp.com/')
            I.see('タスク一覧')
          },
          restore: (I, cookies) => {
            I.amOnPage('https://craftzcat-neko.herokuapp.com/')
            I.setCookie(cookies)
          },
        },
        user: {
          login: (I) => {
            const email = process.env.USER_EMAIL
            const password = process.env.USER_PASSWORD
            if (!email || !password) throw 'Env USERNAME or PASSWORD are null!!'
            I.amOnPage('https://craftzcat-neko.herokuapp.com/login')
            I.fillField('Email', email)
            I.fillField('Password', password)
            I.click('ログイン')
            I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/') // Sign inを押してから即移動しないため明示的にwait
          },
          check: (I) => {
            I.amOnPage('https://craftzcat-neko.herokuapp.com/')
            I.see('タスク一覧')
          },
          restore: (I, cookies) => {
            I.amOnPage('https://craftzcat-neko.herokuapp.com/')
            I.setCookie(cookies)
          },
        }
      }
    }
  }
}
