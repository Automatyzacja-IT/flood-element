import { Browser, By, NullableLocatable } from "@flood/element"

export class FixturesPage {
  readonly browser: Browser
  readonly gridRow: NullableLocatable

  constructor(browser: Browser) {
    this.browser = browser
    this.gridRow = By.css('div[role="row"]')
  }

  visitDashboard = async (environmentUrl: string) => {
    await this.browser.visit(`${environmentUrl}/tanker/processedFixtures`)
  }
}
