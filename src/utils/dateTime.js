export function dateFormat () {
  const date = new Date()
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  )
}

// 获取前n天的日期
export function getBeforeDate (number) {
  const num = number
  const date = new Date()
  let year = date.getFullYear()
  let mon = date.getMonth() + 1
  let day = date.getDate()
  if (day <= num) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  date.setDate(date.getDate() - num)
  year = date.getFullYear()
  mon = date.getMonth() + 1
  day = date.getDate()
  const s =
    year +
    '-' +
    (mon < 10 ? '0' + mon : mon) +
    '-' +
    (day < 10 ? '0' + day : day)
  return s
}

// 获取N个月前/后年月
export function getBeforeAndAfterDate (n) {
  const datePre = new Date()
  const nowYearPre = datePre.getFullYear()
  const nowMonthPre = datePre.getMonth() + 1
  let preMonth = 0
  let result = ''
  // 需要向前nyear个年
  let nyear = Math.floor(n / 12)

  // 需要向前nmon个月
  const nmon = n % 12

  // 向前月数大于等于当前月时，向前年数加一。
  if (nmon >= nowMonthPre) {
    nyear++
  }

  // 向前月数小于等于今年已过月数
  if (nmon <= nowMonthPre - 1) {
    preMonth = nowMonthPre - nmon
  } else {
    // 今天已过m个月，需再向前去n-m个月。
    preMonth = 12 - (nmon - (nowMonthPre - 1)) + 1
  }

  result = nowYearPre - nyear + '-' + getMonInMM(preMonth)
  return result
}

// 返回MM格式的月
const getMonInMM = function (mon) {
  if (mon < 10) {
    return '0' + mon
  } else {
    return mon
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // eslint-disable-next-line camelcase
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  // eslint-disable-next-line camelcase
  return time_str
}
