<template>
  <div class="win-info">
    <div class="title">区域分布</div>
    <v-chart :options="amountOptions" class="echarts" />
  </div>
</template>

<script>
import echarts from 'vue-echarts'
import { queryReleasedDistributed } from '@/api/riskPrevention/importPeople'
export default {
  data() {
    return {
      dataList: [],
      dataList1: [],
      nameList: [],
      title: '精神病患者',
      level: '3级',
      levelList: ['3级', '4级', '5级']
    }
  },
  computed: {
    amountOptions() {
      return {
        grid: {
          left: '18%',
          top: '11%',
          height: '85%'
          //     containLabel: true,
        },
        legend: {
          data: ['总数', '未就业人数'],
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
            name: '未就业人数',
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
  mounted() {
    this.getList()
  },
  methods: {
    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    },
    getList() {
      queryReleasedDistributed().then(res => {
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('numVal'))
          newArr.forEach(item => {
            this.dataList.push(item.numVal)
            this.dataList1.push(item.numVal2)
            this.nameList.push(item.name)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.win-info {
  position: relative;
  width: 420px;
  height: 565px;
  background: url("~@/assets/image/importPeople/xsjj-left-bg2.png") no-repeat
    center center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 28px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
.drop {
  position: absolute;
  right: 0px;
  top: 13px;
  z-index: 40;
}
.el-dropdown {
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  width: 110px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/image/importPeople/button-bg.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
</style>
