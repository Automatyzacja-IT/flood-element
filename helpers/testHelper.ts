import { Table } from "console-table-printer"

import * as statistics from "./statistics"

const ansiColors = require('ansi-colors');
const fs = require('fs')
const glob = require('glob')
const { green } = ansiColors

export function thresholdTest(testName: string, testTitle: string, assertionValue: number) {
  let median: number = 0

  const files = glob.sync("reports/*/data.json")
  const lastElement = files[files.length - 1]
  const rawdata = fs.readFileSync(lastElement, { encoding: "utf8" })
  const parsedDate = JSON.parse(rawdata)
  const testScripts = parsedDate?.testScripts

  if (!Array.isArray(testScripts)) {
    throw new Error("Invalid data.json file")
  }
  testScripts.forEach(
    (testScript: { name?: string; iterationResults: { stepResults: { duration: unknown }[] }[] }, index) => {
      if (testScript.name === `tests/${testName}.perf.ts`) {
        const iterationResults = testScript.iterationResults
        const durationList: any[] = []

        iterationResults.forEach((iteration) => {
          const duration = iteration.stepResults[0].duration
          durationList.push(duration)
        })

        median = thresholdCalculation(durationList, testTitle, assertionValue)
      }
    })
  return median
}

function thresholdCalculation(durationList: any[], testTitle: string, assertionValue: number) {
  const min = statistics.calcMin(durationList)
  const max = statistics.calcMax(durationList)
  const avg = statistics.calcAverage(durationList)
  const p90 = statistics.calcQuartile(durationList, 90)
  const p95 = statistics.calcQuartile(durationList, 95)

  const calculatedMedian = statistics.calcMedian(durationList)

  console.log("")
  console.log(
    green(
      "################################################################################################"
    )
  )
  console.log(green(`############################ ${testTitle} ##################################`))
  console.log(
    green(
      "################################################################################################"
    )
  )
  console.log("")
  console.log(green(`Median assertion: ${assertionValue} ms`))
  console.log("")

  const p = new Table({
    columns: [
      { name: "metric", title: "METRIC", alignment: "left", color: "green" },
      { name: "value", title: "VALUE", alignment: "left", color: "cyan" },
    ],
  })

  p.addRow({ metric: "Min", value: min })
  p.addRow({ metric: "Max", value: max })
  p.addRow({ metric: "Median", value: calculatedMedian })
  p.addRow({ metric: "Avg", value: avg })
  p.addRow({ metric: "P90", value: p90 })
  p.addRow({ metric: "P95", value: p95 })
  p.printTable()

  console.log("")

  return calculatedMedian
}
