import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 分页查询事件列表
export const queryEventList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/pageQuery/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}
