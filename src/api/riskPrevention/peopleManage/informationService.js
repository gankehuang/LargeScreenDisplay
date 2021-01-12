import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'
// 查询人脸抓拍列表
export const getFaceCaptureList = function (pageNum, pageSize, data) {
  return request({
    url: `${network}/${video}/faceSnap/queryWithPage/${pageNum}/${pageSize}`,
    method: 'post',
    data
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

// 获取网格树
export const getGridTree = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridTree`,
    method: 'get',
    params
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
