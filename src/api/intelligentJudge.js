import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 智能研判具体信息
export const getZnypList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/aiSearch/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 智能研判具体信息
export const getZnypStatistic = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/aiStatistic`,
    method: 'get',
    params
  })
}

// 事件催单
export const letUrgeEventById = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/reminder`,
    method: 'get',
    params
  })
}
