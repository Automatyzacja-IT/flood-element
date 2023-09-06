module.exports = {
  options: {
    devtools: false,
    failStatusCode: 1,
    fastForward: false,
    headless: false,
    loopCount: 5,
    sandbox: true,
    slowMo: false,
    verbose: false,
    watch: false,
  },
  paths: {
    workRoot: ".",
    testDataRoot: ".",
    testPathMatch: ["tests/**/*.perf*.ts"],
  },
  testSettings: {
    actionDelay: "0s",
    blockDomains: [],
    browser: "chromium",
    browserLaunchOptions: {},
    clearCache: true,
    clearCookies: true,
    consoleFilter: [],
    device: null,
    disableCache: false,
    extraHTTPHeaders: {},
    ignoreHTTPSErrors: false,
    incognito: false,
    launchArgs: [],
    responseTimeMeasurement: "step",
    stages: [],
    stepDelay: "1s",
    userAgent: "",
    viewport: { width: 1440, height: 900 },
    waitTimeout: "10s",
    waitUntil: "visible",
  },
}