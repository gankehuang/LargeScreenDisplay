<template>
  <InfoBlock title="风险预警">
    <div class="risk-Warning">
      <div class="Warning-top">
        <div class="Warning-top-center">
          <p>预警总数<span class="num">2723</span><span>件</span></p>
        </div>
        <div class="Warning-top-right">
          <div class="arrow" />
          完成率<span>96.12%</span>
        </div>
      </div>
      <div class="Warning-bottom">
        <v-chart :options="options" />
        <span class="tip">风险类型</span>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    options () {
      return {
        color: ['#A9DAFF', '#00FFFF', '#0055FF', '#E6B00E', '#FE573B'],
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
          data: [
            '重点人员0%',
            '流动人口90.77%',
            '出租房屋0%',
            '区域防范9.05%',
            '矛盾排解9.05%'
          ]
        },
        grid: {
          width: '100%',
          height: '100%'
        },
        series: [
          {
            name: '事件情况',
            type: 'pie',
            radius: ['80%', '100%'],
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
            data: [
              {
                value: 0,
                name: '重点人员0%'
              },
              { value: 2528, name: '流动人口90.77%' },
              { value: 30, name: '出租房屋0%' },
              { value: 252, name: '区域防范9.05%' },
              {
                value: 0,
                name: '矛盾排解9.05%'
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
.risk-Warning .Warning-top-left {
    background: url("~@/assets/images/situation/组 85.png") center center /
      100% 100% no-repeat;
  }
  .general-affairs .Warning-top-left {
    background: url("~@/assets/images/situation/组 85(2).png") center center /
      100% 100% no-repeat;
  }
  .risk-Warning,
  .general-affairs {
    width: 400px;
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    .Warning-top {
      width: 100%;
      height: 48px;
      display: flex;
      .Warning-top-left {
        width: 55px;
        height: 48px;
      }
      .Warning-top-center {
        cursor: pointer;
        width: 160px;
        height: 100%;
        margin-top: 12px;
        p {
          margin: 0;
          padding: 0;
          font-size: 18px;
          .num{
            font-size: 24px;
            font-weight: bold;
          }
          &:nth-child(1) {
            font-size: 18px;
            font-weight: 400;
            color: #a9daff;
            line-height: 18px;
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #a9daff;
            line-height: 18px;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .Warning-top-right {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #00ffff;
        line-height: 18px;
        .arrow {
          width: 15px;
          height: 14px;
          margin: 0 30px;
          background: url("~@/assets/images/situation/右箭头.png") 100% 100% no-repeat;
        }
      }
    }
  }
  .risk-Warning .Warning-bottom {
    margin-top: 10px;
    padding-top: 15px;
    display: flex;
    position: relative;
    background: url("~@/assets/images/situation/cir.png") no-repeat 26px 29px;
    background-size: 26% 69%;
      border-top: 1px dashed #00589B;
    .tip{
      position: absolute;
      left: 15%;
      top: 36%;
      width: 40px;
      font-size: 16px;
      color: #A9DAFF;
      font-weight: bold;
    }
    .echarts {
      width: 400px;
      height: 130px;
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
