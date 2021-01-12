<!-- 危化品组件 -->
<template>
  <div class="centent-box">
    <div class="risk-Warning">
      <div class="Warning-bottom">
        <v-chart :options="options" />
        <span class="tip">169</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    options () {
      return {
        color: ['#12ECFA', '#12A6FB', '#125FFB', '#FFEA00', '#10DC92'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'square',
          right: 10,
          top: 10,
          height: 130,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          // data: ['生产经营单位', '经营单位(带存储)', '经营单位(不带存储)', '使用单位', '加油站'],
          formatter: (name) => {
            return name
          }
        },
        series: [
          {
            name: '隐患个数',
            type: 'pie',
            radius: ['80%', '85%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                position: 'center',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .centent-box {
    width: 100%;
    height: 100%;
  }
  .risk-Warning .Warning-bottom {
    margin-top: 25px;
    display: flex;
    position: relative;
    background: url("~@/assets/images/situation/cir.png") no-repeat 22px 19px;
    background-size: 29% 75%;
    .tip{
      position: absolute;
      left: 14%;
      top: 40%;
      width: 40px;
      font-size: 25px;
      color: #A9DAFF;
      font-weight: bold;
    }
    .echarts {
      width: 400px;
      height: 150px;
    }
    .bottom-bgm {
      width: 55px;
      height: 92px;
      position: absolute;
      top: 20px;
      left: 160px;
      background: url("~@/assets/images/situation/组 88 拷贝.png") center
        center / 100% 100% no-repeat;
    }
  }
</style>
