import { Browser, By, NullableLocatable } from "@flood/element"

export class LoginPage {
  readonly browser: Browser
  readonly emailTextField: NullableLocatable
  readonly passwordTextField: NullableLocatable
  readonly cookieAcceptBtn: NullableLocatable
  readonly submitLoginBtn: NullableLocatable

  constructor(browser: Browser) {
    this.browser = browser
    this.emailTextField = By.id("email")
    this.passwordTextField = By.id("password")
    this.cookieAcceptBtn = By.visibleText("Accept")
    this.submitLoginBtn = By.id("submitLogin")
  }

  async goto(environmentUrl: string) {
    await this.browser.visit(`${environmentUrl}/Account/Login`, { waitUntil: "load" })
  }

  login = async (email: string, password: string) => {
    await this.browser.type(this.emailTextField, email)
    await this.browser.type(this.passwordTextField, password)
    await this.browser.click(this.cookieAcceptBtn)
    await this.browser.click(this.submitLoginBtn)
  }
}
