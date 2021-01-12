import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 获取楼栋信息
export const getBuildingList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/building/pageQuery/${pageNum}/${pageSize}`,
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

// 查询人员轨迹
export const queryPeopleRecord = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${video}/faceControl/queryAlarmRecord/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取重点人员点位信息
export const getKeyPopulationGps = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getKeyPopulationGps`,
    method: 'get',
    params
  })
}

// 获取精神病人详情
export const getMentalInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getMentalInfo`,
    method: 'get',
    params
  })
}

// 获取非访人员详情
export const getAcceptInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getAcceptInfo`,
    method: 'get',
    params
  })
}

// 获取社区矫正人员详情
export const getCorrectionInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getCorrectionInfo`,
    method: 'get',
    params
  })
}

// 获取刑满释放人员详情
export const getReleaseInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getReleaseInfo`,
    method: 'get',
    params
  })
}

// 获取退役人员详情
export const getVeteransInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getVeteransInfo`,
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

// 查询人员base图片
export const getPopulationBaseUrl = function (params) {
  return request({
    url: `${network}/${webPlatform}/personnelMapLayer/getPopulationBaseUrl`,
    method: 'get',
    params
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

// 查询人员列表
export const selectPersonByKeyword = function (params) {
  return request({
    url: `${network}/${webPlatform}/population/selectByKeyword`,
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

// 精神病患者统计-按风险等级
export const countMentalPeopleByRiskDegree = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryMentalIllnessCount`,
    method: 'get',
    params
  })
}

// 精神病患者统计-县区分布
export const countMentalPeopleByRegion = function (params) {
  return request({
    url: `${network}/${webPlatform}/riskPrevention/keyPerson/countMentalPeopleByRegion`,
    method: 'get',
    params
  })
}

// 精神病患者走访情况
export const queryMentalIllnessVisit = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryMentalIllnessVisit`,
    method: 'get',
    params
  })
}

// 信访人员统计
export const queryPetitionCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryPetitionCount`,
    method: 'get',
    params
  })
}

// 信访人员统计-县区分布
export const countPetitionPeopleByRegion = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryPetitionDistributed`,
    method: 'get'
  })
}

// 信访目的分布
export const queryPetitionPurpose = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryPetitionPurpose`,
    method: 'get',
    params
  })
}

// 信访关注领域top5
export const queryPetitionTop5 = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryPetitionTop5`,
    method: 'get',
    params
  })
}

// 退役人员县区分布
export const queryRetiredDistributed = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryRetiredDistributed`,
    method: 'get',
    params
  })
}

// 刑释解戒人员
export const queryReleasedCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryReleasedCount`,
    method: 'get',
    params
  })
}

// 刑释解戒人员县区分布
export const queryReleasedDistributed = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryReleasedDistributed`,
    method: 'get',
    params
  })
}

// 刑释解戒人员预警趋势
export const queryReleasedWarningTrend = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryReleasedWarningTrend`,
    method: 'get',
    params
  })
}

// 刑释解戒人员管控分析-就业情况
export const queryReleasedAnalysis = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryReleasedAnalysis`,
    method: 'get',
    params
  })
}

// 社区矫正人员
export const queryCorrecttionalCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryCorrecttionalCount`,
    method: 'get',
    params
  })
}

// 社区矫正人员管控分析
export const queryCorrecttionalAnalysis = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryCorrecttionalAnalysis`,
    method: 'get',
    params
  })
}

// 社区矫正人员区域分布
export const queryCorrecttionalDistributed = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryCorrecttionalDistributed`,
    method: 'get',
    params
  })
}

// 社区矫正人员预警趋势
export const queryCorrecttionalWarningTrend = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/queryCorrecttionalWarningTrend`,
    method: 'get',
    params
  })
}

// 信访搜索
export const getAcceptInfoByNo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getAcceptInfoByNo`,
    method: 'get',
    params
  })
}

// 社区矫正搜索
export const getCorrectionInfoByNo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getCorrectionInfoByNo`,
    method: 'get',
    params
  })
}

// 精神病人搜索
export const getMentalInfoByNo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getMentalInfoByNo`,
    method: 'get',
    params
  })
}

// 刑释人员搜索
export const getReleaseInfoByNo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getReleaseInfoByNo`,
    method: 'get',
    params
  })
}

// 退役人员搜索
export const getVeteransInfoByNo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getVeteransInfoByNo`,
    method: 'get',
    params
  })
}

// 获取各县区重点人员数量
export const getKeyPopulationCountByRegion = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/getKeyPopulationCountByRegion`,
    method: 'get',
    params
  })
}
