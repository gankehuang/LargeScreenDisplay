<template>
  <InfoBlock
    title="预警事件分析"
    height="274px"
  >
    <div class="content">
      <div class="legends">
        <div class="icons">
          <div class="icon">
            <span />
            总数
          </div>
          <div class="icon">
            <span />
            超时处置数
          </div>
        </div>
        <div class="legend">
          <div class="left-title">
            重点人员
          </div>
          <div class="echart">
            <v-chart :options="option1" />
          </div>
        </div>
        <div class="legend">
          <div class="left-title">
            人员聚集
          </div>
          <div class="echart">
            <v-chart :options="option2" />
          </div>
        </div>
      </div>
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
        color: ['#3288E4', '#02FBFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          // data: ['登记流动人口', '流入人口'],
          data: ['流入人口'],
          top: 0,
          right: 10,
          textStyle: {
            color: '#02DCE5'
          }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
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
            show: false,
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '超时处置数',
            '总数'
          ].reverse(),
          axisLabel: {
            show: false,
            color: '#458CDD'
          },
          splitLine: {
            show: false,
            lineStyle: {
              show: false,
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          // {
          //   name: '登记流动人口',
          //   type: 'bar',
          //   label: {
          //     show: true,
          //     position: 'right'
          //   },
          //   itemStyle: {
          //     // 柱形图圆角，初始化效果
          //     barBorderRadius: [10, 10, 10, 10]
          //   },
          //   data: [320, 302, 301, 334, 390, 330, 320, 280, 330]
          // },
          {
            name: '事件总数',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: 10,
            itemStyle: {
              // 柱形图圆角，初始化效果
              // barBorderRadius: [10, 10, 10, 10],
              // color: '#3C9AFE'
              normal: {
                color: function (params) {
                  // build a color map as your need.

                  var colorList = [
                    '#3C9AFE',
                    '#22FFF7'
                  ]

                  return colorList[params.dataIndex]
                }
              }
            },
            data: [
              12,
              26
            ].reverse()
          }
        ]
      }
    },
    option2 () {
      return {
        color: ['#3288E4', '#02FBFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          // data: ['登记流动人口', '流入人口'],
          data: ['流入人口'],
          top: 0,
          right: 10,
          textStyle: {
            color: '#02DCE5'
          }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
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
            show: false,
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '超时处置数',
            '总数'
          ].reverse(),
          axisLabel: {
            show: false,
            color: '#458CDD'
          },
          splitLine: {
            show: false,
            lineStyle: {
              show: false,
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          // {
          //   name: '登记流动人口',
          //   type: 'bar',
          //   label: {
          //     show: true,
          //     position: 'right'
          //   },
          //   itemStyle: {
          //     // 柱形图圆角，初始化效果
          //     barBorderRadius: [10, 10, 10, 10]
          //   },
          //   data: [320, 302, 301, 334, 390, 330, 320, 280, 330]
          // },
          {
            name: '事件总数',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: 10,
            itemStyle: {
              // 柱形图圆角，初始化效果
              // barBorderRadius: [10, 10, 10, 10],
              // color: '#3C9AFE'
              normal: {
                color: function (params) {
                  // build a color map as your need.

                  var colorList = [
                    '#3C9AFE',
                    '#22FFF7'
                  ]

                  return colorList[params.dataIndex]
                }
              }
            },
            data: [
              15,
              24
            ].reverse()
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
.legends {
  .icons {
    display: flex;
    .icon {
      display: flex;
      // margin-right: 10px;
      font-size: 12px;
      color: #A1D8FF;
      span {
        display: block;
        width: 8px;
        height: 8px;
        margin: 1px 3px;
        background: #22FFF7;
      }
    }
    .icon:first-child {
        flex: 1;
        padding-left: 230px;
        span {
          background: #00A2FF;
        }
      }
  }
  .legend {
    width: 370px;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    color: #A1D8FF;
    margin-top: 20px;
    padding-left: 20px;
    font-size: bold;
    display: flex;
     background: url("~@/assets/images/regionalPrevention/analysis-bg.png") no-repeat
      center;
    background-size: 100% 100%;
  }
}
.echart {
  flex: 1;
  // width: 60%;
  height: 100%;
}
</style>
