<template>
  <InfoBlock
    :bg-url="require('@/assets/images/common/info-big-block-bg.png')"
    height="52%"
    title="实时案件"
  >
    <div class="chart-container">
      <div class="type-list">
        <div
          class="item pending"
          :class="statusFilter==='待处理'&&'selected'"
          @click="statusFilter='待处理'"
        >
          <div class="dd">
            {{ eventNum('待处理') }}
          </div>
          <div class="dt">
            待处理
          </div>
        </div>
        <div
          class="item under-disposal"
          :class="statusFilter==='处置中'&&'selected'"
          @click="statusFilter='处置中'"
        >
          <div class="dd">
            {{ eventNum('处置中') }}
          </div>
          <div class="dt">
            处置中
          </div>
        </div>
        <div
          class="item overtime"
          :class="statusFilter==='超时'&&'selected'"
          @click="statusFilter='超时'"
        >
          <div class="dd">
            {{ eventNum('超时') }}
          </div>
          <div class="dt">
            超时
          </div>
        </div>
        <div
          class="item reminders"
          :class="statusFilter==='催单'&&'selected'"
          @click="statusFilter='催单'"
        >
          <div class="dd">
            {{ eventNum('催单') }}
          </div>
          <div class="dt">
            催单
          </div>
        </div>
        <div
          class="item case"
          :class="statusFilter==='结案'&&'selected'"
          @click="statusFilter='结案'"
        >
          <div class="dd">
            {{ eventNum('结案') }}
          </div>
          <div class="dt">
            结案
          </div>
        </div>
      </div>
      <div
        v-if="statusFilter === '处置中'"
        class="event-list"
      >
        <div
          v-for="(item,index) in renderList"
          :key="index"
          class="item"
        >
          <div class="info">
            <div class="line1">
              <span>{{ item.name }}</span>
              <span>{{ item.date }}</span>
              <img
                src="@/assets/images/commandAndDispatch/地址.png"
                class="position"
                @click="focusEvent(item)"
              >
            </div>
            <!-- <img
              class="detail-img"
              :src="require(`@/assets/images/commandAndDispatch/person1.png`)"
            > -->
            <el-image
              class="detail-img"
              fit="cover"
              :preview-src-list="[item.snapImageUrl]"
              :src="item.snapImageUrl"
            />
            <div class="detail">
              {{ item.detail }}
            </div>
            <div class="detail">
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
// import { getAllEventList } from '@/api/event'
// import { getEventArr } from '@/api/composite/composite'
import { getEventArr } from '@/api/common/event'
import { eventAllLists } from './mocks'
export default {
  data () {
    return {
      list: [],
      renderList: [],
      statusFilter: '处置中',
      enumEventStatus: {
        0: '无效事件（误报）',
        1: '待处理',
        2: '处置中',
        3: '结案',
        4: '超时',
        5: '催单'
      },
      searchForm: {
        status: '',
        eventName: '',
        excludeEventCodeList: 'supervise'
      }
    }
  },
  mounted () {
    this.getAllEventList()
  },
  methods: {
    focusEvent (item) {
      this.$emit('focusEvent', item)
    },
    getAllEventList () {
      getEventArr(this.searchForm).then(res => {
        this.list = res.data
          .filter(
            item =>
              item.longitude &&
              item.latitude &&
              item.statusText !== '已处置' &&
              item.statusText !== '已归档' &&
              item.peopleLabel !== '退役人员'
          )
          .map((item, index) => {
            return {
              ...item,
              status: this.enumEventStatus[item.status],
              name: item.eventName,
              date: item.happenedTime,
              peopleName: item.peopleName,
              peopleLabel: item.peopleLabel,
              detail: item.eventName + '预警，请及时处理！',
              address: item.location,
              position: [item.longitude, item.latitude],
              source: item.source,
              longitude: item.longitude,
              latitude: item.latitude,
              id: item.id,
              snapImageUrl: item.snapImageUrl
            }
          })

        this.renderList = toRepeat(this.list, 'deviceSerialNo')
        function toRepeat (arr, key) {
          const res = new Map()
          return arr.filter(
            list => !res.has(list[key]) && res.set(list[key], 1)
          )
        }
      })
    },
    _getAllEventList () {
      this.list = eventAllLists.map((item, index) => {
        return {
          status: this.enumEventStatus[item.status],
          name: item.eventName,
          date: item.happenedTime,
          detail: item.eventName + '预警，请及时处理！',
          address: item.location,
          position: [item.longitude, item.latitude],
          source: item.source,
          longitude: item.longitude,
          latitude: item.latitude,
          id: item.id,
          originImageUrl: item.originImageUrl
        }
      })
      // getEventArr().then(res => {
      //   this.list = res.data.map((item, index) => {
      //     return {
      //       status: this.enumEventStatus[item.status],
      //       name: item.eventName,
      //       date: item.happenedTime,
      //       detail: item.eventName + '预警，请及时处理！',
      //       address: item.location,
      //       position: [item.longitude, item.latitude],
      //       source: item.source,
      //       longitude: item.longitude,
      //       latitude: item.latitude,
      //       id: item.id,
      //       originImageUrl: item.originImageUrl
      //     }
      //   })
      // })
    },
    eventNum (status) {
      if (this.list.length) {
        return this.list.filter(item => item.status === status).length
      }
      console.log(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
    height: 99%;
    width: 99%;
    .title {
        padding-left: 15px;
        line-height: 33px;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
    }
}

.type-list {
    margin-top: 10px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    .item {
        width: 76px;
        height: 72px;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
        background: url("~@/assets/images/commandAndDispatch/组 77@2x (1).png") no-repeat;
        background-size: 100% 100%;
        &.selected {
            background: url("~@/assets/images/commandAndDispatch/组 77@2x.png") no-repeat;
            background-size: 100% 100%;
            color: #ffffff;
        }
        .dd {
            font-size: 18px;
            margin-top: 12px;
            font-weight: bold;
        }
        .dt {
            font-size: 12px;
            margin-top: 5px;
        }

    }
    .pending {
      color: #f05768;
    }
    .under-disposal {
      color: #F7B451;
    }
    .overtime {
      color: #A1D8FF;
    }
    .reminders {
      color: #88C896;
    }
    .case {
      color: #9A78FE;
    }
}

.event-list {
    height: calc(100% - 66px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
    }
    .item {
        width: 403px;
        height: 126px;
        margin-bottom: 11px;
        margin: 5px auto;
        position: relative;
        display: flex;
        cursor: pointer;
        .status {
            color: #00ffff;
            font-size: 12px;
            width: 66px;
            height: 66px;
            text-align: center;
            line-height: 66px;
            // .PageCenter();
            &.status1{
                background-image: url('~@/assets/images/commandAndDispatch/safe/status1.png')
            }
            &.status2{
                background-image: url('~@/assets/images/commandAndDispatch/safe/status2.png')
            }
            &.status3{
                background-image: url('~@/assets/images/commandAndDispatch/safe/status3.png')
            }
            &.status4{
                background-image: url('~@/assets/images/commandAndDispatch/safe/status4.png')
            }
            &.status5{
                background-image: url('~@/assets/images/commandAndDispatch/safe/status5.png')
            }
        }
        .info {
            margin-left: 11px;
            padding-left: 15px;
            padding-right: 10px;
            border-bottom: 1px solid #004387;
            width: 98%;
            flex-grow: 1;
            .detail-img {
              position: absolute;
              left: 12px;
              top: 30px;
              width: 110px;
              height: 80px;
            }
            .line1 {
                box-sizing: border-box;
                color: #ffffff;
                line-height: 24px;
                display: flex;
                justify-content: space-between;
                margin-right: 30px;
            }
            .detail {
                color: #b2e3fc;
                margin-top: 5px;
                width: 70%;
                margin-left: 28%;
            }
        }
        .position {
            position: absolute;
            top: 4px;
            right: 20px;
            width: 16px;
            // .hover();
        }
    }
}
</style>
