<template>
  <div class="leftOne">
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
        grid: {
          top: '3%',
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
          data: ['新疆', '天津', '宁夏', '西藏', '安徽颍上']
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
            name: '人数',
            type: 'bar',
            barWidth: '15',
            data: [2618, 385, 209, 66, 12],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3C9AFE'
                  },
                  {
                    offset: 1,
                    color: '#00FFFF'
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
    width: 100%;
    height: 250px;
}
</style>
