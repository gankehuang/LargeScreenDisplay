import request from '@/utils/request'
import { network, video } from '@/config/gateway'

// 人脸库查询
export const getFaceDatabaseList = function () {
  return request({
    url: `${network}/${video}/faceLib/getAll`,
    method: 'get'
  })
}
