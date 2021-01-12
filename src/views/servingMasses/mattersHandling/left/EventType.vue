<template>
  <InfoBlockTwo
    title="事件类型"
    :content-style-obj="{
      background: `url(${require('@/assets/images/servingMasses/left3-echarts-bg.png')}) no-repeat`,
      backgroundPosition: '74px 67px'}"
  >
    <v-chart
      :options="options"
      class="echarts"
    />
  </InfoBlockTwo>
</template>
<script>
export default {
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          textStyle: {
            color: '#93C6EB'
          },
          formatter: function (name) {
            return name
          }
        },
        series: [
          {
            name: '事件类型',
            type: 'pie',
            radius: ['55%', '85%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              color: '#93C6EB',
              fontSize: 16,
              formatter: function () {
                return '事件\n类型'
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 335,
                name: '法律服务',
                itemStyle: {
                  color: '#12ECFA'
                }
              },
              {
                value: 310,
                name: '社会保障',
                itemStyle: {
                  color: '#12A6FB'
                }
              },
              {
                value: 188,
                name: '城市建设',
                itemStyle: {
                  color: '#125FFB'
                }
              },
              {
                value: 81,
                name: '生活服务',
                itemStyle: {
                  color: '#FFEA00'
                }
              },
              {
                value: 61,
                name: '矛盾纠纷',
                itemStyle: {
                  color: '#10DC92'
                }
              },
              {
                value: 291,
                name: '环境保护',
                itemStyle: {
                  color: '#FF8400'
                }
              },
              {
                value: 216,
                name: '公共服务',
                itemStyle: {
                  color: '#B366FF'
                }
              },
              {
                value: 123,
                name: '公共服务',
                itemStyle: {
                  color: '#EB6877'
                }
              },
              {
                value: 61,
                name: '城市管理',
                itemStyle: {
                  color: '#FED9A1'
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
