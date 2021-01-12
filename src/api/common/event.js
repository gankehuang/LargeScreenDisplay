// 事件相关接口
import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 生成事件
export const createEvent = function (data) {
  return request({
    url: '/event/gen',
    method: 'post',
    data
  })
}

// 查询所有事件
export const getEventArr = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/selectAll`,
    method: 'get',
    params
  })
}

// 获取群防力量
export const getGroupForce = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/getGroupForce`,
    method: 'get',
    params
  })
}

// 事件指派
export const eventAssign = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/assign`,
    method: 'post',
    data
  })
}

// 分页查询组织成员
export const queryOrgMember = function (params) {
  return request({
    url: `${network}/${webPlatform}/orgMember/queryOrgMember/1/50`,
    method: 'get',
    params
  })
}

// 根据id查询事件
export function getEventById (params) {
  return request({
    url: `${network}/${webPlatform}/event/selectById`,
    method: 'get',
    params
  })
}

// 事件处理
export const handleEvent = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/handle`,
    method: 'post',
    data
  })
}

// 各区县事件统计（事件分布情况）
export function countEventByRegion (params) {
  return request({
    url: `${network}/${webPlatform}/preventRisk/countEventByRegion`,
    method: 'get',
    params
  })
}

// 事件状态统计
export function countEventByStatus (params) {
  return request({
    url: `${network}/${webPlatform}/preventRisk/countEventByStatus`,
    method: 'get',
    params
  })
}

// 事件五大类型统计
export function countEventByType (params) {
  return request({
    url: `${network}/${webPlatform}/preventRisk/countEventByType`,
    method: 'get',
    params
  })
}

// 事件类型环比统计
export function countEventChainRatio (params) {
  return request({
    url: `${network}/${webPlatform}/preventRisk/countEventChainRatio`,
    method: 'get',
    params
  })
}
