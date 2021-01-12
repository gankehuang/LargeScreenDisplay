<template>
  <div class="leftOne">
    <div class="rkfbOptions">
      <v-chart
        style="width:100%;height:100%"
        :options="rklrfxOptions"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rklrfxOptions () {
      return {
        color: [
          'rgba(18, 198, 251, 0.5)',
          'rgba(251, 45, 18, 0.5)',
          'rgba(255, 132, 0, 0.5)'
        ],
        name: '模拟数据',
        type: 'line',
        sampling: 'average',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          top: '20%',
          containLabel: true
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
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24'
          ]
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
        legend: {
          data: ['正面', '中面', '负面'],
          top: 0,
          right: 10,
          textStyle: {
            color: 'rgba(161, 216, 255, 1)',
            lineHeight: 20
          },
          formatter: function (name) {
            let result = ''
            switch (name) {
              case '正面':
                result = name + '[21]\n 环比：38.88%'
                break
              case '中面':
                result = name + '[13]\n 环比：21.22%'
                break
              case '负面':
                result = name + '[35]\n 环比：40.00%'
                break
              default:
                break
            }
            return result
          }
        },

        series: [
          {
            name: '正面',
            data: [
              15828,
              16286,
              15656,
              14026,
              16632,
              21458,
              22645,
              23713,
              24067,
              16666,
              16556,
              12200,
              12332,
              12401,
              12534,
              12790,
              12430,
              12520,
              12200,
              12332,
              12401,
              12534,
              12790
            ],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(18, 198, 251, 0.5)'
            },
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
                    color: 'rgba(0, 242, 254, 0.7)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0)'
                  }
                ],
                global: false
              }
            }
          },
          {
            name: '中面',
            data: [
              15828,
              16286,
              15656,
              12790,
              12430,
              12520,
              12200,
              12332,
              12401,
              14026,
              16632,
              21458,
              22645,
              23713,
              24067,
              16666,
              16556,
              12200,
              12332,
              12401,
              12534,
              12534,
              12790
            ],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(251, 45, 18, 0.5)'
            },
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
                    color: 'rgba(251, 45, 18, 0.7)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0)'
                  }
                ],
                global: false
              }
            }
          },
          {
            name: '负面',
            data: [
              12332,
              12401,
              14026,
              16632,
              21458,
              22645,
              23713,
              24067,
              16666,
              16556,
              12200,
              12332,
              12401,
              12534,
              15828,
              16286,
              15656,
              12790,
              12430,
              12520,
              12200,
              12534,
              12790
            ],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(255, 132, 0, 0.5)'
            },
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
                    color: 'rgba(255, 132, 0, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0)'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.leftOne {
  .rkfbOptions {
    width: 100%;
    height: 250px;
  }
}
</style>
