import { expect } from "chai"

import * as testHelper from "./helpers/testHelper"

const fixturesThreshold = 5000

describe("Performance Tests Thresholds Check", async () => {
  it("Vessels Dashboard Thresholds Check", async () => {
    const median = testHelper.thresholdTest("fixtures", "Fixtures", fixturesThreshold)
    expect(median).to.be.at.most(fixturesThreshold)
  }).timeout(60000)
})
