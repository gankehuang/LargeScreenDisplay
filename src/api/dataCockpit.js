import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 查看综治事件区县月份数量
export const queryGovernEventByAreaMouth = function () {
  return request({
    url: `${network}/${webPlatform}/event/queryGovernEventByAreaMouth`,
    method: 'get'
  })
}

// 查看综治访情态势区县月份数量
export const alertAreaAndMonth = function () {
  return request({
    url: `${network}/${webPlatform}/alertPosture/alertAreaAndMonth`,
    method: 'get'
  })
}
