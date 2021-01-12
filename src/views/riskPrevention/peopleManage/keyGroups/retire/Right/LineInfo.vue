<template>
  <InfoBlock
    title="预警趋势"
    height="320px"
  >
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      tab: 0,
      options: {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0780F1'
        },
        grid: {
          top: 20,
          bottom: 25,
          left: 30,
          right: 30
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
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
        series: [
          {
            data: [100, 132, 201, 234, 190, 230, 120, 200, 232, 101, 134, 190],
            type: 'line',
            // smooth: true,
            symbol: 'none'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
