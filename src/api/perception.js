// 智能感知
import request from '@/utils/request'

// 车辆信息总览
export const getCarTotal = function (params) {
  return request({
    url: '/api/carStatisticsController/getCarInfoSummary',
    method: 'get',
    params
  })
}

// 获取人脸卡口列表
export const getFaceBayonetList = function (params) {
  return request({
    url: '/api/gateController/getByCommunityList',
    method: 'get',
    params
  })
}

// 车辆卡口设备列表
export const getBayonetList = function (params) {
  return request({
    url: '/api/carStatisticsController/getBayonet',
    method: 'get',
    params
  })
}

// 车辆卡口设备信息
export const getBayonetInfo = function (params) {
  return request({
    url: '/api/carStatisticsController/getAccessRecord',
    method: 'get',
    params
  })
}

// 人脸门禁设备列表
export const getAccessList = function (params) {
  return request({
    url: '/api/deviceStatisticsController/getDeviceLocationInfo',
    method: 'get',
    params,
    timeout: 50000
  })
}

// 人脸门禁设备信息
export const getAccessInfo = function (params) {
  return request({
    url: '/api/deviceStatisticsController/getAccessRecordStatistics',
    method: 'get',
    params
  })
}

// 人脸感知-----感知信息总览
export const getPerceptionInfo = function (params) {
  return request({
    url: '/api/deviceStatisticsController/getPerceptionInfo',
    method: 'post',
    params
  })
}

// 人脸感知-----实时进出感知（获取某出入口24小时数据）
export const getRealTimePerception = function (params) {
  return request({
    url: '/api/deviceStatisticsController/getRealTimePerception',
    method: 'get',
    params
  })
}

// 人脸感知-----实时进出感知(获取出入口列表)
export const getGateList = function (params) {
  return request({
    url: '/api/gateController/getByCommunityList',
    method: 'get',
    params
  })
}

// 人脸感知-----重要卡口感知数据
export const keyBayonetPerception = function (params) {
  return request({
    url: '/ajax/platform/KeyBayonetPerception',
    method: 'post',
    params
  })
}

// 人脸感知-----抓拍人数类型感知
export const getPersonType = function (params) {
  return request({
    url: '/ajax/platform/numberType',
    method: 'post',
    params,
    timeout: 500000
  })
}

// 人脸感知-----获取人脸列表
export const getFaceList = function (params) {
  return request({
    url: '/ajax/hkFace/getFaceList',
    method: 'post',
    params
  })
}

// 车辆卡口进出流量
export const getBayonetFlow = function (params) {
  return request({
    url: '/api/carStatisticsController/getBayonetFlow',
    method: 'get',
    params
  })
}

// 车辆列表
export const getCarList = function (params) {
  return request({
    url: '/api/carStatisticsController/getCarListFirstStay',
    method: 'get',
    params
  })
}

// 车辆列表(高频出入)
export const getCarList2 = function (params) {
  return request({
    url: '/api/carStatisticsController/getCarListOften',
    method: 'get',
    params
  })
}

// 车辆嫌疑目标分析 (时间)
export const getCarSuspectByTime = function (params) {
  return request({
    url: '/api/carStatisticsController/getSuspicionTargetByTime',
    method: 'get',
    params
  })
}

// 车辆嫌疑目标分析 (地点)
export const getCarSuspectByAddress = function (params) {
  return request({
    url: '/api/carStatisticsController/getSuspicionTargetByName',
    method: 'get',
    params
  })
}

// 摄像头设备列表
export const getCameraList = function (params) {
  return request({
    url: '/ajax/device/getDeviceList',
    method: 'post',
    params
  })
}

// 摄像机设备信息
export const getCameraInfo = function (params) {
  return request({
    url: '/ajax/device/getDeviceInfo',
    method: 'post',
    params,
    timeout: 50000
  })
}

// 开始摄像头视频监控
export const startVideo = function (params) {
  return request({
    url: '/ajax/video/startVideo',
    method: 'post',
    params,
    timeout: 50000
  })
}

// 停止摄像头视频监控
export const stopVideo = function (params) {
  return request({
    url: '/ajax/video/stopVideo',
    method: 'post',
    params,
    timeout: 50000
  })
}

// 获取iot设备列表(wifi,消防栓,井盖)
export const getIotList = async function (params) {
  return await request({
    url: '/iot/device/pageQuery',
    method: 'get',
    params
  })
}

// 获取wifi探针设备数据 终端列表
export const getWifiListTerminal = async function (params) {
  return await request({
    url: '/iot/device/wifi/terminal/pageQuery',
    method: 'get',
    params
  })
}

// 获取wifi探针设备数据 AP热点列表
export const getWifiListAp = async function (params) {
  return await request({
    url: '/iot/device/wifi/ap/pageQuery',
    method: 'get',
    params
  })
}

// 获取消防栓数据
export const getFireHydrantData = function (params) {
  return request({
    url: '/iot/device/fireHydrant/history/listPage',
    method: 'get',
    params
  })
}

// 获取智能井盖数据
export const getManholeCoverData = function (params) {
  return request({
    url: '/iot/device/manholeCover/history/listPage',
    method: 'get',
    params
  })
}

// 获取电路监测设备列表
export const getElectricityList = async function (params) {
  return await request({
    url: '/api/powerController/getPage',
    method: 'post',
    params
  })
}

// 获取电表实时数据
export const getElectricityRealData = function (params) {
  return request({
    url: '/iot/power/getBoxChannelsRealtime',
    method: 'get',
    params
  })
}

// 获取电表报警数据
export const getElectricityWarnData = function (params) {
  return request({
    url: '/iot/power/getBoxAlarm',
    method: 'get',
    params
  })
}

//  获取报警箱设备列表
export const getWarningBoxList = function (params) {
  return request({
    url: '/ajax/alarmDevice/getAlarmDeviceList',
    method: 'post',
    params
  })
}

// 查询设备报警事件
export const getWarningBoxData = function (params) {
  return request({
    url: '/ajax/alarmmessage/getAlarmMessageList',
    method: 'post',
    params
  })
}

// 物联感知-设备报警类型
export const getDeviceEvent = function (params) {
  return request({
    url: '/event/metrics/deviceEvent',
    method: 'get',
    params
  })
}

// 物联感知-设备报警处置
export const getByDeviceEventAndStatus = function (params) {
  return request({
    url: '/event/metrics/byDeviceEventAndStatus',
    method: 'get',
    params
  })
}

// 物联感知-大类事件列表
export const getBigEventList = function (params) {
  return request({
    url: '/event/pageQuery',
    method: 'get',
    params
  })
}

// 物联感知-实时预警
export const getRealtimeWarningList = function (params) {
  return request({
    url: '/event/query/realtime',
    method: 'get',
    params
  })
}

// 物联感知-公共服务|公共安全|公共管理
export const byClassificationAndTime = function (params) {
  return request({
    url: '/event/metrics/byClassificationAndTime',
    method: 'get',
    params
  })
}

// 获取车辆卡口信息
export const getByDeviceNum = function (params) {
  return request({
    url: '/carManage/vehicleController/getByDeviceNum',
    method: 'get',
    params
  })
}
