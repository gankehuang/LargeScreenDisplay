import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 访情态势地图
export const mapData = function () {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPetitionDistributed`,
    method: 'get'
  })
}

// 统计信访数量和涉访人员数量
export const queryPostureCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPostureCount`,
    method: 'get',
    params: params
  })
}

// 获取信访渠道
export const queryPetitionByChannel = function () {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPetitionByChannel`,
    method: 'get'
  })
}

// 警情问题突出领域top5
export const getTop5 = function () {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPetitionTop5`,
    method: 'get'
  })
}

// 月度信访事件排行-信访数量
export const monthlyVisits = function (params) {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPetitionByDateDistributed`,
    method: 'get',
    params: params
  })
}

// 访情环比同比
export const alertDate = function (params) {
  return request({
    url: `${network}/${webPlatform}/applyPosture/queryPetitionByYear`,
    method: 'get',
    params: params
  })
}
