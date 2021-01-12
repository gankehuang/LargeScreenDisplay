<template>
  <div class="win-info">
    <div class="title">预警趋势</div>
    <v-chart :options="options" class="echarts" />
  </div>
</template>

<script>
import { queryReleasedWarningTrend } from '@/api/riskPrevention/importPeople'
export default {
  computed: {
    options() {
      return {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0780F1'
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: [100, 132, 201, 234, 190, 230, 120, 200, 332, 101, 234, 390],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3C9AFE'
                  },
                  {
                    offset: 1,
                    color: '#14ACFF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  data() {
    return {
      data: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      queryReleasedWarningTrend().then(res => {
        if (res.status === 200) {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/importPeople/xsjj-right-bg1.png") no-repeat
    center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 24px;
    position: absolute;
    top: 15px;
    left: 30px;
  }
  .echart {
    width: 100%;
    height: 100%;
  }
  .tabs {
    position: absolute;
    top: 13px;
    right: 16px;
    width: 162px;
    height: 30px;
    display: flex;
    background: url("~@/assets/image/interviewSituation/left-active.png")
      no-repeat center;
    background-size: 100% 100%;
    z-index: 99;
    .tabItem {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #7ebdff;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      background: url("~@/assets/image/interviewSituation/right-active.png")
        no-repeat center;
    }
  }
}
</style>
