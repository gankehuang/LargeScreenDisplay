<template>
  <div class="win-info">
    <div class="title">
      就业情况
    </div>
    <!-- <div :class="['tabs', { active: tab == 1 }]">
      <div class="tabItem" @click="tab = 0">
        就业情况
      </div>
      <div class="tabItem" @click="tab = 1">
        家庭情况
      </div>
    </div> -->
    <v-chart
      :options="options"
      class="echarts"
    />
  </div>
</template>

<script>
import { queryReleasedAnalysis } from '@/api/riskPrevention/importPeople'
export default {
  data () {
    return {
      tab: 0,
      data1: ['安置就业', '其他', '自主就业', '三无'],
      data2: ['孤儿', '单亲', '无子女'],
      total: ['帮教就业', '自主就业', '未就业'],
      dataList: [],
      dataList1: [175, 160, 156],
      dataList2: []
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
          top: '20%',
          width: '90%',
          height: '70%',
          left: '10',
          containLabel: true
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
          data: this.total
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
            data: this.dataList,
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
  // watch: {
  //   tab(val) {
  //     if (val === 0) {
  //       this.total = this.data1
  //       this.dataList = this.dataList2
  //     } else {
  //       this.total = this.data2
  //       this.dataList = this.dataList1
  //     }
  //   }
  // },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      queryReleasedAnalysis().then(res => {
        if (res.status === 200) {
          this.total = this.data1
          this.dataList2 = [
            // res.data.azjyCount,
            // res.data.zmjyCount,
            // res.data.swCount,
            8798,
            res.data.qtCount,
            2159,
            3
          ]
          this.dataList = this.dataList2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/importPeople/xsjj-right-bg1.png") no-repeat
    center;
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
  .echart {
    width: 100%;
    height: 100%;
  }
  .tabs {
    position: absolute;
    top: 13px;
    right: 16px;
    width: 162px;
    height: 30px;
    display: flex;
    background: url("~@/assets/image/interviewSituation/left-active.png")
      no-repeat center;
    background-size: 100% 100%;
    z-index: 99;
    .tabItem {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #7ebdff;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      background: url("~@/assets/image/interviewSituation/right-active.png")
        no-repeat center;
    }
  }
}
</style>
