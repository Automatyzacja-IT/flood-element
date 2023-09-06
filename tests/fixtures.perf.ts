import { step, beforeAll } from '@flood/element'
import { LoginPage } from '../pages/login/login'
import { NavBarPage } from '../pages/common/navBar'
import { FixturesPage } from '../pages/fixtures/fixtures'
import { Common } from '../pages/common/common'

const environmentUrl = "https://app.signalocean.com";
const email = "youremail";
const password = "yourpassword";

export default () => {
    beforeAll(async browser => {
        const loginPage = new LoginPage(browser);
        const navBar = new NavBarPage(browser)

        await loginPage.goto(environmentUrl)
        await loginPage.login(email, password)

        await navBar.waitForNavbar()
        await navBar.changeModeIfNeeded("Tanker")
    })

    step('Fixtures Dashboard Performance Test', async browser => {
        const fixtures = new FixturesPage(browser)
        const common = new Common(browser)

        await fixtures.visitDashboard(environmentUrl)
        await common.waitForPacer()

        await browser.click(fixtures.gridRow)

        await browser.takeScreenshot()
    })
}
