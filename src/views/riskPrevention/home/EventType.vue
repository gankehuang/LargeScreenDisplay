<template>
  <InfoBlock
    title="事件总览"
    height="400px"
  >
    <div class="event-num">
      <span class="num-label">预警总数</span>
      <VerticalNumTo :total="eventStatusObj.totalCount" />
      <span>件</span>
    </div>
    <div class="list-container">
      <div class="list-item">
        <div class="item-num">
          {{ eventStatusObj.unProcessedCount }}
          <span class="item-unit">件</span>
        </div>
        <div class="item-state">
          未受理
        </div>
      </div>
      <div class="list-item">
        <div class="item-num">
          {{ eventStatusObj.processingCount + eventStatusObj.reminderCount }}
          <span class="item-unit">件</span>
        </div>
        <div class="item-state">
          已派发
        </div>
      </div>
      <div class="list-item">
        <div class="item-num">
          2345
          <span class="item-unit">件</span>
        </div>
        <div class="item-state">
          超时
        </div>
      </div>
      <div class="list-item">
        <div class="item-num">
          2345
          <span class="item-unit">件</span>
        </div>
        <div class="item-state">
          催单
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 200px;">
      <v-chart
        :options="options"
        class="echarts"
      />
    </div>
  </InfoBlock>
</template>

<script>
import VerticalNumTo from '@/components/VerticalNumTo'
import {
  countEventByStatus,
  countEventByType
} from '@/api/common/event'
export default {
  components: {
    VerticalNumTo
  },
  data () {
    return {
      eventStatusObj: {
        unProcessedCount: 0,
        processingCount: 0,
        completedCount: 0,
        totalCount: 0,
        timeoutCount: 0,
        processedCount: 0,
        reminderCount: 0
      },
      eventTypeObj: {
        conflict: 0,
        internetPublicOpinion: 0,
        politicalSecurity: 0,
        publicSafety: 0,
        socialSecurity: 0
      },
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 25,
          textStyle: {
            color: '#93C6EB'
          },
          formatter: function (name) {
            return name
          }
        },
        series: [
          {
            name: '纠纷类型',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['30%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              color: '#93C6EB',
              fontSize: 16,
              formatter: function () {
                return '纠纷\n类型'
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 335,
                name: '重点人群',
                itemStyle: {
                  color: '#12ECFA'
                }
              },
              {
                value: 310,
                name: '流动人口',
                itemStyle: {
                  color: '#12A6FB'
                }
              },
              {
                value: 188,
                name: '出租房屋',
                itemStyle: {
                  color: '#125FFB'
                }
              },
              {
                value: 81,
                name: '区域防范',
                itemStyle: {
                  color: '#FFEA00'
                }
              },
              {
                value: 61,
                name: '矛盾排解',
                itemStyle: {
                  color: '#10DC92'
                }
              },
              {
                value: 291,
                name: '舆情监测',
                itemStyle: {
                  color: '#FF8400'
                }
              },
              {
                value: 216,
                name: '安全生产',
                itemStyle: {
                  color: '#B366FF'
                }
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.countEventByStatus()
    this.countEventByType()
  },
  methods: {
    countEventByStatus () {
      countEventByStatus().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.eventStatusObj = {
            unProcessedCount: data.unProcessedCount,
            processingCount: data.processingCount,
            completedCount: data.completedCount,
            reminderCount: data.reminderCount,
            totalCount: data.totalCount,
            timeoutCount: data.timeoutCount,
            processedCount: data.processedCount
          }
        }
      })
    },
    countEventByType () {
      countEventByType().then(res => {
        const { status, data } = res
        if (status === 200) {
          console.log(data)
          this.eventTypeObj = {
            conflict: data.conflict,
            internetPublicOpinion: data.internetPublicOpinion,
            politicalSecurity: data.politicalSecurity,
            publicSafety: data.publicSafety,
            socialSecurity: data.socialSecurity
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.event-num {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: #A1D8FF;
  .num-label {
    margin-right: 15px;
    font-size: 16px;
  }
  /deep/ .vertical-num-to {
    /deep/ .number {
      top: 0;
    }
  }
}
.list-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .list-item {
    .item-num {
      padding-top: 8px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      width: 69px;
      height: 62px;
      background: url("~@/assets/images/riskPreventionHome/left1-item-bg.png")
      no-repeat;
      background-size: 100% 100%;
    }
    .item-state {
      margin-top: 8px;
      color: #A1D8FF;
      text-align: center;
    }
  }
}
</style>
