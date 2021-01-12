<template>
  <InfoBlock
    title="区域分布"
    height="565px"
  >
    <v-chart
      :options="amountOptions"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import { queryCorrecttionalDistributed } from '@/api/riskPrevention/peopleManage/keyGroups'
import echarts from 'vue-echarts'
export default {
  data () {
    return {
      dataList: [],
      nameList: [],
      dataList1: [],
      title: '精神病患者',
      level: '3级',
      levelList: ['3级', '4级', '5级']
    }
  },
  computed: {
    amountOptions () {
      return {
        grid: {
          left: '18%',
          top: '11%',
          height: '85%'
          //     containLabel: true,
        },
        legend: {
          data: ['总数', '脱管人数'],
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          top: '5%',
          right: '10%'
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false,
              color: '#458CDD'
            },
            axisLine: {
              show: false,
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
              show: false,
              lineStyle: {
                color: '#ffffff'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '脱管人数',
            type: 'bar',
            barWidth: '14px',
            data: this.dataList1,
            stack: '堆叠',
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#F9FF55' },
                  { offset: 1, color: '#FFB24F' }
                ])
              }
            }
          },
          {
            name: '总数',
            type: 'bar',
            barWidth: '14px',
            data: this.dataList,
            stack: '堆叠',
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#50A2FF' },
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
    this.getList()
  },
  methods: {
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    },
    getList () {
      queryCorrecttionalDistributed().then(res => {
        if (res.status === 200) {
          this.nameList = []
          this.dataList = []
          this.dataList1 = []
          const newArr = res.data.sort(this._compare('numVal'))
          newArr.forEach((item, index) => {
            this.nameList.push(item.name)
            this.dataList1.push(item.numVal2)
            this.dataList.push(item.numVal)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
