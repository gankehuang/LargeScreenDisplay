<!-- 预警事件组件 -->
<template>
  <div class="centent-box">
    <v-chart :options="options" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dataList: this.data
    }
  },
  computed: {
    options () {
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
        grid: {
          top: 20,
          bottom: 25,
          left: 30,
          right: 30
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
          data: this.data.time
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
            data: this.data.data,
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
  }
}
</script>
<style lang="scss" scoped>
  .centent-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .echarts {
      width: 400px;
      height: 200px;
    }

  }
</style>
