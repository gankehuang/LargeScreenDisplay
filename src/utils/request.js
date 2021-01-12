import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 500000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { respCode } = dataAxios // 这个状态码是和后端约定的
    if (respCode === undefined) {
      // 特殊接口可能不含 code
      return dataAxios
    } else if (respCode === 1) {
      // code:1 请求成功
      return dataAxios.datas
    } else {
      return dataAxios
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
