import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 报警事件统计
export const getEventCount = function (params) {
  return request({
    url: '/event/metrics/byDeviceEventAndStatus',
    method: 'get',
    params
  })
}

// 报警事件统计(按设备类别) 感知采集统计
export const getEventCountByDevice = function (params) {
  return request({
    url: '/event/metrics/byDeviceTypeAndStatus',
    method: 'get',
    params
  })
}

// 事件类型统计(按类别)
export const getEventCountByType = function (params) {
  return request({
    url: '/event/metrics/byType',
    method: 'get',
    params
  })
}

// 事件类型统计(按时间)
export const getEventChartByType = function (params) {
  return request({
    url: '/event/metrics/byTypeBetweenTime',
    method: 'get',
    params
  })
}

// 事件来源
export const getEventSource = function (params) {
  return request({
    url: '/event/metrics/bySourceAndEmergency',
    method: 'get',
    params
  })
}

// 事件列表 未处理
export const getEventList = function (params) {
  return request({
    url: '/event/query/realtime/1/100',
    method: 'get',
    params
  })
}

export const getEventList1 = function (params) {
  return request({
    url: '/event/query/realtime',
    method: 'get',
    params
  })
}

// 事件列表查询 全部
export const getAllEventList = function (params) {
  return request({
    url: '/event/pageQuery/1/100',
    method: 'get',
    params
  })
}

// 事件状态
export const getEventByStatus = function (params) {
  return request({
    url: '/event/metrics/bySourceAndStatusBetweenTime',
    method: 'get',
    params
  })
}

// 趋势分析
export const getEventTrendList = function (params) {
  return request({
    url: '/event/metrics/byTypeBetweenTime',
    method: 'get',
    params
  })
}

// 事件处置力量
export const getEventPower = function () {
  return request({
    url: '/event/groupForce/metrics',
    method: 'get'
  })
}

// 获取群防力量
export const getGroupForce = function () {
  return request({
    url: '/event/groupForce/getAll',
    method: 'get'
  })
}

// 事件指派
export const eventAssign = function (data) {
  return request({
    url: '/event/assign',
    method: 'post',
    data
  })
}

// 事件关闭
export const eventHandle = function (data) {
  return request({
    url: '/event/generalHandle',
    method: 'post',
    data
  })
}

// 生成事件
export const createEvent = function (data) {
  return request({
    url: '/event/gen',
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
