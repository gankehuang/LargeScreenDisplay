<template>
  <div class="leftOne">
    <div class="rkfbOptions">
      <v-chart
        style="width:100%;height:100%"
        :options="rkfbOptions"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rkfbOptions () {
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
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
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
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '青山湖区',
            '经开区',
            '西湖区',
            '高新区',
            '青云谱区',
            '东湖区',
            '南昌县',
            '红谷滩区',
            '进贤县',
            '安义县',
            '新建区',
            '湾里局'
          ].reverse(),
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
            name: '流入人口',
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
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
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
            },
            data: [
              219985,
              122340,
              97814,
              83192,
              64401,
              49961,
              33089,
              23260,
              20857,
              14921,
              13464,
              5553
            ].reverse()
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
    height: 400px;
  }
}
</style>
