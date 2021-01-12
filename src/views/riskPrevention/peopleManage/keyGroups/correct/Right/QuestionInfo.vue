<template>
  <InfoBlock
    title="管控情况"
    height="275px"
  >
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import { queryCorrecttionalAnalysis } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      tab: 0,
      ystgCount: 0,
      tgCount: 0,
      lgCount: 0
    }
  },
  computed: {
    options () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
            color: '#7DBCFF'
            // interval: 0,
            // rotate: -40,
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
          data: ['脱管', '疑似脱管', '漏管']
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
        color: ['#3C9AFE', '#00FFFF', '#0056FF'],
        series: [
          {
            name: '人员情况',
            type: 'bar',
            barWidth: '50',
            // data: [this.ystgCount, this.lgCount, this.tgCount],
            data: [46, 8, 2],
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#3C9AFE', '#00FFFF', '#0056FF']
                  return colorList[params.dataIndex]
                }
              },
              // 鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
      this.loading = true
      queryCorrecttionalAnalysis().then(res => {
        if (res.status === 200) {
          res.data.forEach(element => {
            switch (element.name) {
              case 'ystg':
                this.ystgCount = element.numVal
                break
              case 'tg':
                this.tgCount = element.numVal
                break
              case 'lg':
                this.lgCount = element.numVal
                break
            }
          })
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
