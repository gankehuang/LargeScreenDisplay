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
        color: ['#14ACFF', '#E6B00E'],
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
          bottom: '10%',
          top: '3%',
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
        // legend: {
        //   data: ['流出人口', '流入人口'],
        //   top: 30,
        //   right: 10,
        //   textStyle: {
        //     color: '#02DCE5'
        //   }
        // },
        series: [
          {
            name: '流出人口',
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
              16556
            ],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: '#14ACFF'
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
                    color: '#14ACFF4d'
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
