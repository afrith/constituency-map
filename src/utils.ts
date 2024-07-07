export const formatInt = (num: number | string | null | undefined): string => {
  if (num == null) {
    return ''
  } else if (typeof num === 'number') {
    return num.toLocaleString('en-GB', { maximumFractionDigits: 0 })
  } else {
    return parseInt(num).toLocaleString('en-GB', { maximumFractionDigits: 0 })
  }
}

export const formatPerc = (num: number | string | null | undefined): string => {
  if (num == null) {
    return ''
  } else if (typeof num === 'number') {
    return (num * 100).toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + '%'
  } else {
    return (parseFloat(num) * 100).toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + '%'
  }
}
