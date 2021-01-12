import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 分页查询监控点
export const queryCameraList = function (pageNo, size, params) {
  return request({
    url: `${network}/${video}/camera/findByPage/${pageNo}/${size}`,
    method: 'get',
    params
  })
}

// 查询网格详情
export const queryGridDetailInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryGridDetail`,
    method: 'get',
    params
  })
}

// 查询南昌市网格
export const queryGridThreeLine = function () {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridThreeLine`,
    method: 'get'
  })
}

// 查询指定区域网格
export const getGridLine = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridLine`,
    method: 'get',
    params
  })
}

// 网格层级数量详情-网格视图
export const queryGridLevelNum = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryGridLevelNum`,
    method: 'get',
    params
  })
}

// 根据网格分页查询网格融合详情
export const queryGridFusePerson = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryGridFusePerson/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 根据网格和类型分页查询人口详情
export const queryPopulation = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryPopulation/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 根据网格分页查询特殊人口详情
export const querySpecialPopulation = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/querySpecialPopulation/${pageNum}/${pageSize}`,
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

// 查询摄像头抓拍图片
export const selectSnapFaceBy = function (params) {
  return request({
    url: `${network}/${webPlatform}/compositeSateMapLayer/selectSnapFaceBy`,
    method: 'get',
    params
  })
}

// 停止RTC摄像头视频监控
export const stopVideo = function (params) {
  return request({
    url: `${network}/${video}/camera/stopVideo`,
    method: 'post',
    params
  })
}

// 新的停止RTC摄像头视频监控
export const newStopVideo = function (params) {
  return request({
    url: `${network}/${video}/camera/stopVideo`,
    method: 'post',
    params
  })
}

// 查询安全网点
export const selectSafetyLocation = function (params) {
  return request({
    url: `${network}/${webPlatform}/safetyLocation/selectSafetyLocation`,
    method: 'get',
    params
  })
}

// 获取天网视频Token
export const getToken = function () {
  return request({
    url: `${network}/${webPlatform}/singlePoint/getVideoToken`,
    method: 'get'
  })
}

// 按区县统计摄像头个数
export const countCameraByRegion = function () {
  return request({
    url: `${network}/${video}/camera/countCameraByRegion`,
    method: 'get'
  })
}

// 红色驿站
export const getSCHsPost = function () {
  return request({
    url: `${network}/${webPlatform}/keyLocation/getSCHsPost`,
    method: 'get'
  })
}

// 红色物业
export const getSCHsProperty = function () {
  return request({
    url: `${network}/${webPlatform}/keyLocation/getSCHsProperty`,
    method: 'get'
  })
}

// 心防组织
export const getSCPsychologicalCounseling = function () {
  return request({
    url: `${network}/${webPlatform}/keyLocation/getSCPsychologicalCounseling`,
    method: 'get'
  })
}

// 按区域查询红色网格
export const queryRedGrid = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryRedGrid`,
    method: 'get',
    params
  })
}

// 查询红色网格统计
export const queryCountRedGrid = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryCountRedGrid`,
    method: 'get',
    params
  })
}

// 根据网格查询事件状态数量
export const queryGovernEventNumByGrid = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/queryGovernEventNumByGrid`,
    method: 'get',
    params
  })
}

// 群防群治
export const queryQFQZ = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryQFQZ`,
    method: 'get'
  })
}

// 政法队伍建设
export const queryZFDWJS = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryZFDWJS`,
    method: 'get'
  })
}

// 平安志愿者
export const getQYZHGKData = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getQYZHGKData`,
    method: 'get'
  })
}

// 两所一庭两中心
export const queryLSYTLZX = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryLSYTLZX`,
    method: 'get'
  })
}
