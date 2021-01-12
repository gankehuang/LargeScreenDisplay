self.addEventListener(
  'message',
  function ({ data }) {
    let url = 'http://172.11.16.243:8084/hgt-platform/event/selectAll'
    if (data.params) {
      const paramsArray = []
      Object.keys(data.params).forEach(key =>
        paramsArray.push(key + '=' + data.params[key])
      )
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    setInterval(function () {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          self.postMessage(data.data)
        })
    }, 6000)
  },
  false
)
