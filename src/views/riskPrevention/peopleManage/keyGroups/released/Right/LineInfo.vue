<template>
  <InfoBlock
    title="预警趋势"
    height="275px"
  >
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import { queryReleasedWarningTrend } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      data: false
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
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
        },
        grid: {
          top: 20,
          bottom: 25,
          left: 30,
          right: 30
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
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      queryReleasedWarningTrend().then(res => {
        if (res.status === 200) {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
