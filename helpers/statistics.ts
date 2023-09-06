export function calcMin(arr: number[]) {
  return Math.min(...arr)
}

export function calcMax(arr: number[]) {
  return Math.max(...arr)
}

export function calcMedian(arr: number[]) {
  const half = Math.floor(arr.length / 2)
  arr.sort((a, b) => a - b)
  if (arr.length % 2) return arr[half];
  return (arr[half - 1] + arr[half]) / 2.0
}

export function calcAverage(arr: string[]) {
  const a = arr.slice()
  if (a.length) {
    const sum = sumArr(a)
    const avg = sum / a.length
    return Math.round(avg)
  }
  return false
}

export function calcQuartile(arr: string[], q: number): number {
  const a = arr.slice()
  q /= 100

  const data = sortArr(a)

  const p = (data.length - 1) * q
  const b = Math.floor(p)

  const remainder = p - b

  if (data[b + 1] !== undefined) {
    return parseFloat(data[b]) + remainder * (parseFloat(data[b + 1]) - parseFloat(data[b]))
  } else {
    return parseFloat(data[b])
  }
}

function sortArr(arr: string[]) {
  const ary = arr.slice()
  ary.sort((a, b) => {
    return parseFloat(a) - parseFloat(b)
  })
  return ary
}

function sumArr(arr: string[]): number {
  const arrayCopy = arr.slice()
  return arrayCopy.reduce((a, b) => {
    return a + parseFloat(b)
  }, 0)
}
