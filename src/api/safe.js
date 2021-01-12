import request from '@/utils/request'

// 获取监控设备 列表
export const getDepartmentList = function () {
  return request({
    url: '/qfqzVisualization/queryUserInfos',
    method: 'post'
  })
}

// 获取设备路径信息 根据日期
export const getPathByDate = function (params) {
  return request({
    url: '/qfqzVisualization/queryPosInfos',
    method: 'post',
    params
  })
}

// 获取设备路径信息 根据日期范围
export const queryPosInfosDateRange = function (params) {
  return request({
    url: '/qfqzVisualization/queryPosInfosDateRange',
    method: 'post',
    params
  })
}

// 获取序列号,验证码
export const getSeq = function () {
  return request({
    url: '/qfqzVisualization/getSeq',
    method: 'post'
  })
}

// 开启设备录像
export const openVideo = function (userId) {
  return request({
    url: '/qfqzVisualization/startVideo',
    method: 'post',
    params: { userId }
  })
}

// 关闭设备录像
export const stopVideo = function (userId) {
  return request({
    url: '/qfqzVisualization/stopVideo',
    method: 'post',
    params: { userId }
  })
}

// 切换清晰度
export const changeDeinition = function (defintion, userId) {
  return request({
    url: '/qfqzVisualization/changeDefinition',
    method: 'post',
    params: { defintion, userId }
  })
}

// 延长播放时间
export const changeMaxTimer = function (time, userId) {
  return request({
    url: '/qfqzVisualization/changeMaxTime',
    method: 'post',
    params: { time, userId }
  })
}

// 文字广播
export const sendMessage = function (content, userIds) {
  return request({
    url: '/qfqzVisualization/facadeSendBroadcast',
    method: 'post',
    params: { content, userIds: userIds.toString() }
  })
}
