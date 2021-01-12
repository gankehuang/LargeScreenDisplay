<template>
  <InfoBlock
    title="事件预警趋势"
    height="274px"
  >
    <div class="echart">
      <v-chart :options="option1" />
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    option1 () {
      return {
        grid: {
          left: '10%',
          right: 0,
          bottom: '5%',
          top: '5%',
          height: '85%'
          //     containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12'
            ],
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#A9DAFF'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.7)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 73, 104, 0.7)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '2020',
            type: 'line',
            barWidth: '30px',
            data: [1180, 2280, 3120, 2308, 1780, 1180, 1280, 3120, 1308, 1708, 1780, 3380],
            smooth: true,
            symbol: 'none',
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#559AF6' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(85,154, 246,0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                },
                color: '#559AF6'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
