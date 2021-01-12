import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'
// 查询所有事件
export const getEventArr = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/selectAll`,
    method: 'get',
    params
  })
}

// 分页查询监控点
export const queryCameraList = function (pageNo, size, params) {
  return request({
    url: `${network}/${video}/camera/findByPage/${pageNo}/${size}`,
    method: 'get',
    params
  })
}
