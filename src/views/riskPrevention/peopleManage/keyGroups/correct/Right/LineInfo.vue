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
import { queryCorrecttionalWarningTrend } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      tab: 0,
      dataList: []
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
            data: this.dataList,
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
      queryCorrecttionalWarningTrend().then(res => {
        console.log(res)
        if (res.status === 200) {
          this.dataList = [
            res.data.januaryCount,
            res.data.februaryCount,
            res.data.marchCount,
            res.data.aprilCount,
            res.data.mayCount,
            res.data.juneCount,
            res.data.julyCount,
            res.data.augustCount,
            res.data.septemberCount,
            res.data.octoberCount,
            res.data.novemberCount,
            res.data.decemberCount
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
