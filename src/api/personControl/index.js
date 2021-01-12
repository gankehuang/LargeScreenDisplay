import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 查询网格树形信息
export const saveFaceControl = function (data) {
  return request({
    url: `${network}/${video}/face/saveRecord`,
    method: 'post',
    data
  })
}

// 人脸布控分页查询
export const faceControlList = function (pageNo, size, data) {
  return request({
    url: `${network}/${video}/face/findByPage?pageNo=${pageNo}&size=${size}`,
    method: 'post',
    data
  })
}

// 编辑人脸布控
export const editFaceControl = function (data) {
  return request({
    url: `${network}/${video}/face/modifySinglePictureControl`,
    method: 'post',
    data
  })
}

// 查询人脸抓拍列表
export const getFaceCaptureList = function (pageNum, pageSize, data) {
  return request({
    url: `${network}/${video}/faceSnap/queryWithPage/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })
}

// 查询重点人员
export const getKeyPersonnelList = function (params) {
  return request({
    url: `${network}/${webPlatform}/personnelMapLayer/keyPersonnelList`,
    method: 'get',
    params
  })
}

// 查询特殊关爱
export const getSpecialCareList = function (params) {
  return request({
    url: `${network}/${webPlatform}/personnelMapLayer/specialCareList`,
    method: 'get',
    params
  })
}

// 查询志愿者
export const getVolunteerList = function (params) {
  return request({
    url: `${network}/${webPlatform}/personnelMapLayer/volunteerList`,
    method: 'get',
    params
  })
}

// 查询人员列表
export const selectPersonByKeyword = function (params) {
  return request({
    url: `${network}/${webPlatform}/population/selectByKeyword`,
    method: 'get',
    params
  })
}

// 查询抓拍记录
export const getPersonSnapRecords = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/population/snapRecords/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 查询车辆抓拍记录
export const getVehicleSnapRecords = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/vehicleSnap/queryWithPage/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 人脸库查询
export const getFaceDatabaseList = function () {
  return request({
    url: `${network}/${video}/faceLib/getAll`,
    method: 'get'
  })
}
// 分页查询人脸名单
export const getFaceRecordList = function (params) {
  return request({
    url: `${network}/${video}/faceRecord/queryWithPage/1/300`,
    method: 'get',
    params
  })
}

// 根据库查询人脸名单
export const getFaceByDatabaseId = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/faceRecord/queryWithPage/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 查询人员base图片
export const getPopulationBaseUrl = function (params) {
  return request({
    url: `${network}/${webPlatform}/personnelMapLayer/getPopulationBaseUrl`,
    method: 'get',
    params
  })
}

// 查找布控报警信息
export const queryVehiclesAlarmInfo = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/vehicleControl/queryVehiclesAlarmInfo/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

export const queryDeployResultWithPage = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/vehicleControl/queryDeployResultWithPage/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取人脸布控告警
export const queryAlarmRecord = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/faceControl/queryAlarmRecord/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}
// 分页查询人脸布控任务信息
export const getPersonControlsWithPage = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/faceControl/getPersonControlsWithPage/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}
