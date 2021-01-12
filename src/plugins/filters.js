export const hideName = function (val) {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    val = val.replace(/（[^)]*）/g, '')
    const str = val.substr(0, val.length - 1)
    let xxx = ''
    for (let i = 0; i < str.length; i++) {
      xxx += '*'
    }
    return val.replace(str, xxx)
  } else {
    return val
  }
}

export const hidePhone = function (val) {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.substr(3, 4)
    return val.replace(str, '****')
  } else {
    return val
  }
}

export const hideIdCard = function (val) {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.substr(6, 8)
    return val.replace(str, '********')
  } else {
    return val
  }
}

export const hideAddress = function (val) {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.slice(Math.floor(val.length / 2))
    let xxx = ''
    for (let i = 0; i < str.length; i++) {
      xxx += '*'
    }
    return val.replace(str, xxx)
  } else {
    return val
  }
}
