self.addEventListener(
  'message',
  function ({ data }) {
    const { gridCode, gridType } = data
    getVideoList({ gridCode, gridType })
  },
  false
)

const requestNum = 3000

// 获取天网视频列表
function getVideoList ({ gridCode, gridType }) {
  fetch(
    resultUrl(
      `http://172.11.16.243:8084/video/camera/findByPage/1/${requestNum}`,
      { type: 0, gridCode }
    )
  )
    .then(response => response.json())
    .then(res => {
      const { data, status } = res

      if (status === 200) {
        // 第一次请求，获取列表总数,计算需要分批请求的次数
        let markers = []
        const firstList = data.list.filter(
          item => item.longitude && item.latitude
        )

        markers = [...firstList]
        const pageNum = Math.ceil(data.total / requestNum)

        if (pageNum <= 1) {
          self.postMessage({
            gridType,
            markers
          })
          return
        }

        // 如果1次请求不完该列表所有数据，需要分批循环请求
        let count = 0
        for (let i = 2; i <= pageNum; i++) {
          setTimeout(function () {
            fetch(
              resultUrl(
                `http://172.11.16.243:8084/video/camera/findByPage/${pageNum}/${requestNum}`,
                { type: 0, gridCode }
              )
            )
              .then(response => response.json())
              .then(res => {
                count++
                const { status, data } = res
                if (status === 200) {
                  const list = data.list.filter(
                    item => item.longitude && item.latitude
                  )

                  markers = [...markers, ...list]
                  if (count === pageNum - 1) {
                    self.postMessage({
                      gridType,
                      markers
                    })
                  }
                }
              })
          }, 3500)
        }
      }
    })
}

// 处理get方法url
function resultUrl (url, params) {
  let resultUrl = url
  const paramsArray = []
  Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
  if (resultUrl.search(/\?/) === -1) {
    resultUrl += '?' + paramsArray.join('&')
  } else {
    resultUrl += '&' + paramsArray.join('&')
  }
  return resultUrl
}
