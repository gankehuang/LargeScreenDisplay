<template>
  <InfoBlock
    title="区域分布"
    height="520px"
  >
    <v-chart
      :options="amountOptions"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
import echarts from 'vue-echarts'
import { queryRetiredDistributed } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      dataList: [],
      datalist1: [8, 8, 6, 18, 27, 36, 4, 27, 14, 21, 12, 20],
      nameList: [],
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
          top: 0,
          height: '100%'
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
            name: '总数',
            type: 'bar',
            barWidth: '14px',
            data: this.dataList,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: 'rgba(79,162,255,0.2)' },
                  { offset: 1, color: '#00F5F6' }
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
    getList () {
      queryRetiredDistributed().then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            this.nameList.push(item.xzqh)
            this.dataList.push(item.cnt)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
