<template>
  <div class="layout">
    <PageTop />
    <router-view />

    <Alert
      v-if="alert.display"
      :alert-info="alert.info"
      @bindBtnClose="alert.display = false"
      @bindShowDetail="lookEventDetail"
    />
  </div>
</template>

<script>
import PageTop from './pageTop'
import Alert from '@/components/Alert'
import { createEvent } from '@/api/common/event'
import { dateFormat } from '@/utils/dateTime'

export default {
  components: {
    PageTop,
    Alert
  },
  data () {
    return {
      alert: {
        display: false,
        info: {}
      },
      lastEvent: {},
      timer: null,
      authority: false
    }
  },
  mounted () {
    this.initEnterEvent()
    // this.startEventPolling()
  },
  methods: {
    // 轮询事件列表
    startEventPolling () {
      const worker = new Worker('../pollingWorker.js')
      worker.onmessage = ({ data }) => {
        const event = data[0]
        // 如果上一次警报事件的id 与 当前事件列表的第一条事件的id 不相同，说明有新事件发生
        if (event && this.lastEvent.id !== event.id) {
          if (new Date() - new Date(event.happenedTime) < 60 * 1000) {
            this.alert.info = event
            this.alert.display = true
            this.lastEvent = event
          }
        }
      }

      worker.postMessage({
        params: {
          excludeEventCodeList: 'supervise'
        }
      })
    },
    // 点击查看详情
    lookEventDetail (info) {
      this.$router.push({
        path: '/riskPrevention/warning',
        query: {
          id: info.id
        }
      })
      // 点击查看详情后，报警框消失
      this.alert.display = false
    },
    initEnterEvent () {
      document.onkeydown = function (e) {
        const e1 = e || event || window.event
        if (e1 && e1.keyCode === 65) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '紧急报警按钮',
            deviceNo: '221',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'EMERGENCY_BUTTON',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '7',
              deviceName: '紧急报警按钮',
              deviceNumber: '221',
              deviceType: '2',
              idNo: '360430195606250000',
              name: '吴金华',
              originImageUrl:
                'http://223.82.111.143:8081/group1/M00/01/BB/wKgBvF7PL-yALu01AABP-c5dv_g697.jpg',
              peopleSubType: '独居老人',
              peopleType: '特殊关爱',
              phone: '13755601663',
              serialNumber: 'MIT201912023421',
              sex: '1',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 83) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能烟感',
            deviceNo: '225',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'SMOKE_ALARM',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '8',
              deviceName: '智能烟感',
              deviceNumber: '225',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023423',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 68) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能燃气监测',
            deviceNo: '226',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'GAS_LEAK_ALARM',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '9',
              deviceName: '智能燃气监测',
              deviceNumber: '226',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023427',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 70) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能地磁',
            deviceNo: '227',
            deviceType: '',
            emergencyLevel: 3,
            eventCode: 'EMERGENCY_CHANNEL_OCCUPY',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '19',
              deviceName: '智能地磁',
              deviceNumber: '227',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023429',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .page-main {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
