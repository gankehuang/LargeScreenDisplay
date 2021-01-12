<template>
  <div
    :ref="id"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'wordCloundChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs[this.id])
      const option = {
        title: {
          text: this.title,
          x: 'center'
        },
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 13,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [16, 40],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            // 随机生成字体颜色
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ')'
                  )
                }
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the PageCenter and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: 0,
            bottom: 0,
            width: '200%',
            height: '200%',
            // 数据
            data: this.data
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped></style>
