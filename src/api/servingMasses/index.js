import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 分页查询综治事件列表
export const queryGovernEvent = function (pageNum, pageSize, data) {
  return request({
    url: `${network}/${webPlatform}/t_event/page/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })
}

// 根据字典类型编码查询
export const treeList = function (params) {
  return request({
    url: `${network}/${webPlatform}/dict/data/treeList`,
    method: 'get',
    params
  })
}

// 根据父网格id查询网格
export const queryGridByParentId = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridByParentId`,
    method: 'get',
    params
  })
}

// 查看综治事件详情
export const queryGovernEventDetail = function (params) {
  return request({
    url: `${network}/${webPlatform}/t_event/detail`,
    method: 'get',
    params
  })
}

// 根据父网格id查询网格
export const queryGovernEventProcessInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/t_event/process_info`,
    method: 'get',
    params
  })
}
