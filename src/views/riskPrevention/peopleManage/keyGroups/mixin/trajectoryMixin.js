import {
  getVehicleSnapRecords,
  queryPeopleRecord
} from '@/api/riskPrevention/peopleManage/keyGroups'
import { renderPath } from '@/common/createTrajectory'

export default {
  data () {
    return {}
  },
  methods: {
    showPath (info, type) {
      if (type === 1) {
        // 车辆轨迹
        this.loading = true
        const fd = {
          beginTime: '2020-01-01 00:00:00',
          endTime: '2021-10-25 00:00:00',
          plateNo: '赣ADY888'
        }
        getVehicleSnapRecords(1, 20, fd).then(res => {
          this.loading = false
          if (res.status === 200) {
            const listObj = []

            res.data.list.forEach(item => {
              if (item.longitude && item.latitude) {
                listObj.push({
                  ...item,
                  lnglat: [item.longitude, item.latitude]
                })
              }
            })

            if (listObj.length > 0) {
              renderPath(this.map, listObj, {
                width: 24,
                height: 48,
                isAutoRotate: true,
                avatar: require('@/assets/images/common/car.png'),
                speed: 3000
              })
            } else {
              this.$message.warning('该人员车辆暂无轨迹！')
            }
          }
        })
      } else {
        // 人员轨迹
        const fd = {
          certificateNumber: info.idCard,
          beginTime: '2020-01-01 00:00:00',
          endTime: '2021-10-25 00:00:00'
        }
        this.loading = true
        queryPeopleRecord(1, 50, fd).then(res => {
          this.loading = false
          const list = []
          if (res.data.list) {
            res.data.list.forEach(item => {
              if (item.longitude && item.latitude) {
                list.push({
                  ...item,
                  lnglat: [item.longitude, item.latitude]
                })
              }
            })
            if (list.length > 0) {
              this.showCloseButton = true
              const list1 = list.reverse()
              renderPath(
                this.map,
                list1,
                {
                  width: 80,
                  height: 80,
                  isAutoRotate: false,
                  avatar: info.imgbase64,
                  speed: 3000
                },
                (e, info) => {
                  this.infoWindowData = {
                    lat: e.originalEvent.lnglat.lat,
                    lon: e.originalEvent.lnglat.lng,
                    ...info.pathData.points[info.pointIndex]
                  }
                }
              )
            } else {
              this.$message.warning('抓拍图没有经纬度信息，未查询到轨迹信息!')
            }
          } else {
            this.$message.warning('该人员暂无轨迹！')
          }
        })
      }
    }
  }
}
