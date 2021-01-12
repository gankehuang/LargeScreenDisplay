let network = ''
let video = ''
let webPlatform = ''
let auth = ''
let face = ''
let event = ''
let loginURl = ''

// 所有网关配置
if (process.env.NODE_ENV === 'production') {
  // 正式环境 修改在 .env.production文件中修改
  network = process.env.VUE_APP_URL
  video = process.env.VUE_APP_VIDEO
  webPlatform = process.env.VUE_APP_WEBPLATFORM
  auth = process.env.VUE_APP_AUTH
  face = process.env.VUE_APP_FACE
  event = process.env.VUE_APP_EVENT
} else {
  // network = 'http://106.225.143.132:8084'
  network = 'http://192.168.1.100:8084'
  loginURl = 'http://192.168.1.100:8084'
  // network = 'http://192.168.0.143:8084'
  // network = 'http://192.168.0.133:8084'
  video = 'video'
  webPlatform = 'px-platform'
  auth = 'auth'
  face = 'face'
  event = 'event'
}

export { network, video, webPlatform, face, event, auth, loginURl }
