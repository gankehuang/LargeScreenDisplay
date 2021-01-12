<template>
  <InfoBlock
    title="视联网"
  >
    <!-- <Selector
      slot="topRight"
      :btns="['从高到低','从低到高']"
      @bindSelectOne="renderChartToday"
      @bindSelectTwo="renderChartToweek"
    />
    <v-chart
      :options="options"
      height="220px"
    /> -->
    <!-- <IframeVideoPlay
      :url="url"
      class="video-item"
      width="100%"
      height="200"
    /> -->
    <!-- <el-image
      class="img"
      :src="require('@/assets/images/commandAndDispatch/智慧视觉中心一楼大厅.jpg')"
    /></el-image> -->
    <el-image
      class="img"
      :src="require('@/assets/images/commandAndDispatch/智慧视觉中心一楼大厅.jpg')"
      :preview-src-list="[require('@/assets/images/commandAndDispatch/智慧视觉中心一楼大厅.jpg')]"
    />
  </InfoBlock>
</template>

<script>
// import Selector from './Selector'
import echarts from 'echarts'
export default {
  components: {
    // Selector
  },
  data () {
    return {
      chartData: [39, 28, 59, 20, 40, 18, 36, 69, 32],
      url: require('@/assets/videos/1.mp4')
    }
  },
  computed: {
    options () {
      return {
        tooltip: {
          show: true,
          formatter: '{b}:{c}'
        },
        grid: {
          left: '5%',
          top: '8%',
          right: '10%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: true,
          position: 'bottom',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1d3448'
              }
            },
            axisLabel: {
              color: '#FFFEFF',
              fontSize: '10px'
            },
            data: ['NO.9', 'NO.8', 'NO.7', 'NO.6', 'NO.5', 'NO.4', 'NO.3', 'NO.2', 'NO.1']
          }
        ],
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(255,255,255,0.3)' }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [150, 150, 150, 150, 150, 150, 150, 150, 150],
            animation: false,
            tooltip: {
              show: false
            }
          },
          {
            name: '综合排名',
            type: 'bar',
            itemStyle: {
              shadowBlur: 10,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#2B81CF'
                },
                {
                  offset: 1,
                  color: '#00FECC'
                }
              ])
            },
            data: this.chartData
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChartToday()
  },
  methods: {
    renderChartToday () {
      this.chartData.sort((a, b) => a - b)
    },
    renderChartToweek () {
      this.chartData.sort((a, b) => b - a)
    }
  }
}
</script>
<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 220px;
  }
  .img {
    width: 100%;
    height: 200px;
  }
</style>
