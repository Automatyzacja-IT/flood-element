import { Browser, By, NullableLocatable, Until } from "@flood/element"

export class NavBarPage {
  readonly browser: Browser
  readonly vesselTypeMenu: NullableLocatable
  readonly navbar: NullableLocatable

  constructor(browser: Browser) {
    this.browser = browser
    this.vesselTypeMenu = By.css("div[class=sideNav-header-title]")
    this.navbar = By.css("div[class^=sideNav]")
  }

  waitForNavbar = async () => {
    await this.browser.wait(Until.elementIsVisible(this.navbar))
    await this.browser.wait(Until.elementIsVisible(this.vesselTypeMenu))
    await this.browser.click(this.vesselTypeMenu)
  }

  changeModeIfNeeded = async (mode: string) => {
    if ((await this.browser.findElements(By.linkText(mode))).length === 0) {
      await this.browser.click(By.linkText(mode))
    }
  }

  goToDashboardIfNeeded = async (environmentUrl: string, dashboardName: string, dashboardUrlName: string) => {
    if ((await this.browser.getUrl()) !== `${environmentUrl}/tanker/${dashboardUrlName}`) {
      await this.browser.click(By.linkText(dashboardName))
    }
  }
}
