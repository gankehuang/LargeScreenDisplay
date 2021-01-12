import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 获取天网视频Token
export const getToken = function () {
  return request({
    url: `${network}/${webPlatform}/singlePoint/getVideoToken`,
    method: 'get'
  })
}
