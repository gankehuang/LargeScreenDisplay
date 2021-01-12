import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 查询所有小区
export const getCommunityList = function () {
  return request({
    url: `${network}/${webPlatform}/community/pageQuery/1/200`,
    method: 'get'
  })
}

// 根据行政区划查询所有小区
export const selectByRegion = function () {
  return request({
    url: `${network}/${webPlatform}/community/selectByRegion`,
    method: 'get'
  })
}

// 房屋数量
export const queryRoomCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryRoomCount`,
    method: 'get',
    params
  })
}

// 出租房使用类型
export const queryUseTypeRoomRentCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryUseTypeRoomRentCount`,
    method: 'get',
    params
  })
}

// 出租房县区分布
export const queryRentRoomDistributed = function () {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryRentRoomDistributed`,
    method: 'get'
  })
}
