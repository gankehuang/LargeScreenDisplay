<template>
  <div class="ring-per-chart-container">
    <div
      class="ring-per-chart"
      :style="styleObj"
    >
      <v-chart :options="options" />
    </div>
    <!-- 说明性标签、数据 -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    // 组件内echart样式
    styleObj: {
      type: Object,
      default: () => {}
    },
    // 组件百分比圆形样式
    center: {
      type: Array,
      default: () => ['50%', '50%']
    },
    radius: {
      type: Array,
      default: () => ['85%', '100%']
    },
    color: {
      type: String,
      default: ''
    },
    // 是否开启名称百分比
    isPerBool: {
      type: Boolean,
      default: () => true
    },
    // 传入计算百分比数据
    number: {
      type: Number,
      default: 0,
      required: true
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    name: {
      type: String,
      default: '系列名'
    },
    label: {
      type: Object,
      default: () => {
        return {
          normal: {
            // outside inside inner PageCenter
            position: 'inner',
            color: '#fff',
            fontSize: 14
          }
        }
      }
    }
  },
  computed: {
    options () {
      return {
        legend: {
          show: false
        },
        series: [
          {
            name: this.name,
            type: 'pie',
            radius: [0, 0],
            center: this.center,
            hoverAnimation: false,
            animation: false,
            // 百分比文字样式
            label: this.label,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: this.isPerBool
                  ? this.total
                    ? ((this.number / this.total) * 100).toFixed(2) + '%'
                    : '0.00%'
                  : this.number
              }
            ]
          },
          {
            type: 'pie',
            center: this.center,
            radius: this.radius,
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            animationEasing: 'cubicOut',
            data: [
              {
                value: this.number,
                itemStyle: {
                  color: this.color
                }
              },
              {
                value: this.total - this.number,
                itemStyle: {
                  color: 'transparent'
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.ring-per-chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.ring-per-chart {
  width: 78px;
  height: 78px;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
