import { Browser, By, NullableLocatable, Until } from "@flood/element"

export class Common {
  readonly browser: Browser
  readonly inactivePacer: NullableLocatable

  constructor(browser: Browser) {
    this.browser = browser
    this.inactivePacer = By.css("div[class*=pace-inactive]")
  }

  waitForPacer = async () => {
    await this.browser.wait(Until.elementLocated(this.inactivePacer))
  }
}
