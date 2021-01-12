<template>
  <InfoBlock
    title="信访关注问题TOP5"
    height="450px"
  >
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import { queryPetitionTop5 } from '@/api/riskPrevention/peopleManage/keyGroups'

export default {
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    options () {
      return {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 20,
          bottom: 100
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#7DBCFF',
            interval: 0,
            rotate: -40
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
          data: [
            '劳动和社会保障',
            '安置补偿',
            '房地产开发管理',
            '城乡建设',
            '房屋拆迁'
          ]
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#A9DAFF'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#7DBCFF'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '问题数据',
            type: 'bar',
            barWidth: '16',
            data: this.sortDataList,
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
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
                    color: '#00FFFF'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    },
    sortDataList () {
      const dataList = [...this.dataList]
      return dataList.sort(function (a, b) {
        return a - b
      })
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      queryPetitionTop5().then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            this.dataList.push(item.number)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
