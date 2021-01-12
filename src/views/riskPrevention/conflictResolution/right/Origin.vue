<template>
  <InfoBlock
    class="con-res-type"
    title="矛盾纠纷来源"
  >
    <v-chart
      :options="middleOption"
      class="chart"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      optionsData: [
        { name: '社区上报', value: 23 },
        { name: '网格员上报', value: 23 },
        { name: '居民上报', value: 23 },
        { name: '网络舆情转化', value: 23 },
        { name: '部门系统流转', value: 23 }
      ]
    }
  },
  computed: {
    middleOption () {
      return {
        color: ['#3B9AFE', '#00FFFF', '#A9DAFF', '#02C439', '#0055FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} '
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.optionsData.filter(item => {
              return item.name === name
            })
            return name + '  ' + (Number((value[0].value / 100) * 100) + '%')
          },
          textStyle: {
            color: '#fff',
            lineHeight: 24,
            fontSize: 14
          },
          top: 10,
          right: 10,
          data: [
            '社区上报',
            '网格员上报',
            '居民上报',
            '网络舆情转化',
            '部门系统流转'
          ]
        },
        series: [
          {
            name: '事件来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['22%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { name: '社区上报', value: 82.69 },
              { name: '网格员上报', value: 5.51 },
              { name: '居民上报', value: 4.68 },
              { name: '网络舆情转化', value: 3.63 },
              { name: '部门系统流转', value: 3.49 }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.con-res-type {
  width: 420px;
  height: 275px;

  ::v-deep.content {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    top: 20px;
  }
  .chart {
    width: 100%;
    height: 100%;
  }
  .icon {
    font-size: 24px;
    color: #3b9afe;
  }
}
</style>
