<template>
  <div class="rightOne">
    <v-chart
      style="width:100%;height:100%"
      :options="rklrOptions"
    />
  </div>
</template>

<script>
export default {
  computed: {
    rklrOptions () {
      return {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: '14px',
          textStyle: {
            color: 'rgba(161, 216, 255, 1)'
          }
        },
        grid: {
          top: '13%',
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0
            // rotate: -40
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
          data: ['老年', '中年', '青年', '少年', '儿童']
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
        series: [
          {
            name: '男',
            type: 'bar',
            barWidth: '10',
            data: [51476, 104186, 118757, 52475, 34794],
            itemStyle: {
              color: '#008AFF'
              // color: {
              //   type: 'linear',
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: '#3C9AFE'
              //     },
              //     {
              //       offset: 1,
              //       color: '#00FFFF'
              //     }
              //   ],
              //   global: false
              // }
            }
          },
          {
            name: '女',
            type: 'bar',
            barWidth: '10',
            data: [52526, 109158, 126245, 60545, 38675],
            itemStyle: {
              color: '#12EDFB'
              // color: {
              //   type: 'linear',
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: '#3C9AFE'
              //     },
              //     {
              //       offset: 1,
              //       color: '#00FFFF'
              //     }
              //   ],
              //   global: false
              // }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rightOne {
  width: 100%;
  height: 250px;
}
</style>
