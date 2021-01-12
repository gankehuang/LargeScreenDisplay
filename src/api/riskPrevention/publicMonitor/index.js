import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'
// 分页查询事件列表
export const queryEventList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/pageQuery/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 自动登录
export const autoLogin = function () {
  return request({
    url: `${network}/${webPlatform}/singlePoint/getToken`,
    method: 'get'
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

// 视频预览接口
export const startVideo = function (id) {
  return request({
    url: `${network}/${video}/camera/startVideo/${id}`,
    method: 'post'
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

// 事件核实
export const eventVerify = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/verify`,
    method: 'post',
    data
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
