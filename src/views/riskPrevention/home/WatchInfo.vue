<template>
  <InfoBlock
    title="事件环比"
    height="328px"
  >
    <v-chart
      :options="amountOptions"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import echarts from 'vue-echarts'
import { countEventChainRatio } from '@/api/common/event'
export default {
  data () {
    return {
      nameList: ['政治安全', '社会治安', '矛盾纠纷', '公共安全', '网络安全'],
      curMonthDataList: [],
      nextMonthDataList: [],
      title: '精神病患者'
    }
  },
  computed: {
    amountOptions () {
      return {
        grid: {
          left: '20%',
          top: '15%',
          height: '75%'
        },
        legend: {
          data: ['上月', '本月'],
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          top: '3%',
          right: '10%'
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              color: '#458CDD'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.8)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.nameList,
            axisLabel: {
              color: '#ffffff'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '上月',
            type: 'bar',
            barWidth: '14px',
            data: this.nextMonthDataList,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ])
              }
            }
          },
          {
            name: '本月',
            type: 'bar',
            barWidth: '14px',
            data: this.curMonthDataList,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
                ])
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.countEventChainRatio(3)
  },
  methods: {
    countEventChainRatio (type) {
      this.nameList = []
      this.nextMonthDataList = []
      this.curMonthDataList = []
      countEventChainRatio({
        type
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          const baseList = [
            {
              type: 'internetPublicOpinion',
              name: '网络安全',
              num: data.internetPublicOpinionPre
            },
            {
              type: 'publicSafety',
              num: data.publicSafetyPre,
              name: '公共安全'
            },
            {
              type: 'conflict',
              num: data.conflictPre,
              name: '矛盾纠纷'
            },
            {
              type: 'socialSecurity',
              num: data.socialSecurityPre,
              name: '社会治安'
            },
            {
              type: 'politicalSecurity',
              num: data.politicalSecurityPre,
              name: '政治安全'
            }
          ]

          const newArr = baseList.sort(this._compare('num'))

          newArr.forEach(item => {
            this.nextMonthDataList.push(item.num)
            this.nameList.push(item.name)
            this.curMonthDataList.push(data[item.type])
          })
        }
      })
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
