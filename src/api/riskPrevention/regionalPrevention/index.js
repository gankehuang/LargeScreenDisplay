import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'
// 分页查询事件列表
export const queryLocationList = function (params) {
  return request({
    url: `${network}/${webPlatform}/safetyLocation/selectSafetyLocation`,
    method: 'get',
    params
  })
}
