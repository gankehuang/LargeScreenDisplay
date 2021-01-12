import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

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

// 查询组织机构信息
export const getOrgList = function (params) {
  return request({
    url: `${network}/${webPlatform}/org/queryOrgTree`,
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

// 平安志愿者队伍
export const safeVolunteerTeam = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/volunteerTeamCountByCode`,
    method: 'get',
    params
  })
}

// 获取群防组织
export const queryOrgTree = function (params) {
  return request({
    url: `${network}/${webPlatform}/org/queryOrgTree`,
    method: 'get',
    params
  })
}
