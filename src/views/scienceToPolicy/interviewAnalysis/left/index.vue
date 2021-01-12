<template>
  <div class="left">
    <DropMenuGroup :back-value="backValue" />
    <div
      class="info"
      style="marginTop: 20px"
    >
      <div class="title">
        信访事件
      </div>
      <div class="centent-line-one">
        <img
          class="img-one"
          src="@/assets/images/interviewAnalysis/left-top-bg-three.png"
        >
        <div class="box-two">
          <div class="box-title">
            123333件
          </div>
          <div class="box-two-centent">
            信访总数
          </div>
        </div>
        <div class="line-box" />
        <div class="box-three">
          <div class="box-three-centent">
            <div>同比</div>
            <div :style="yearOrYear">
              34%
            </div>
            <img
              :src="yearOrYearImg"
            >
          </div>
          <div
            class="box-three-centent"
            style="paddingTop: 24px"
          >
            <div>环比</div>
            <div :style="yearOnYear">
              34%
            </div>
            <img
              :src="yearOnYearImg"
            >
          </div>
        </div>
      </div>
      <div class="centent-line-two">
        <div class="centent-one-box">
          <div class="centent-inside">
            <div>29%</div>
            <div>办结率</div>
          </div>
        </div>
        <div class="centent-two-box">
          <div class="centent-inside">
            <div>89%</div>
            <div>满意度</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        信访人员
      </div>
      <div class="count1">
        <span style="margin-right: 5px;">人员总数</span>
        <VerticalNumTo :total="368" />
        <span style="margin-left: 5px;">人</span>
      </div>
      <div class="count2">
        <div class="mes">
          128<span>起</span>
          <div>赴京</div>
        </div>
        <div class="mes">
          1971<span>起</span>
          <div>赴省</div>
        </div>
        <div class="mes">
          1971<span>起</span>
          <div>赴市</div>
        </div>
      </div>
    </div>
    <div class="info info-background">
      <div class="title">
        信访来源渠道
      </div>
      <div class="origin">
        <v-chart :options="options" />
        <span class="tip">来源渠道</span>
      </div>
    </div>
  </div>
</template>
<script>
import { dataList } from './mock'

import VerticalNumTo from '@/components/VerticalNumTo'

const greenClass = {
  color: { color: '#19D893' },
  img: require('@/assets/images/interviewAnalysis/down.png')
}

const redClass = {
  color: { color: '#FD4E4D' },
  img: require('@/assets/images/interviewAnalysis/up.png')
}

export default {
  components: {
    VerticalNumTo
  },
  data () {
    return {
      yearOrYear: greenClass.color,
      yearOrYearImg: greenClass.img,
      yearOnYear: redClass.color,
      yearOnYearImg: redClass.img
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
          // data: ['电话  1234', '微信  2341', '网络  67213', '来访  25671', '来信  7891'],
          formatter: (name) => {
            return name
          }
        },
        series: [
          {
            name: '信访来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['25%', '50%'],
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
            data: dataList
          }
        ]
      }
    }
  },
  methods: {
    backValue: function (item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  width: 23%;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;

  .btn-box {
    width: 100%;
    display: flex;

    .left-top-btn {
      width: 120px;
      height: 30px;
      color: #ffffff;
      background: url('~@/assets/images/interviewAnalysis/left-btn-bg.png') no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .el-dropdown-width {
        width: 80px;
      }
    }
  }

  .btn-box, .left-top-btn, span {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }

  .title {
    width: 290px;
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;
    color: #D0DFFF;
    font-weight: bold;
    background: url('~@/assets/images/policeAnalysis/title-bg.png')no-repeat center;
    background-size: 100% 100%;
  }
  .info {
    height: 33%;

    .centent-line-one {
      padding-left: 26px;
      padding-top: 20px;
      width: 100%;
      display: flex;
      align-items: center;

      .img-one {
        width: 41px;
        height: 48px;
      }

      .box-two {
        margin-left: 16px;

        .box-title {
          color: #ffffff;
          width: 102px;
          height: 20px;
          font-size: 20px;
          font-weight: bold;
        }

        .box-two-centent {
          margin-top: 13px;
          color: #A1D8FF;
          font-size: 16px;
          font-weight: 400;
        }
      }

      .line-box {
        margin-left: 34px;
        width: 1px;
        height: 32px;
        background: #008AFF;
        border-radius: 1px;
      }

      .box-three {
        margin-left: 41px;

        .box-three-centent {
          display: flex;
          align-items: center;

          div:first-child {
            color: #A1D8FF;
          }

          div:nth-child(2) {
            padding-left: 16px;
          }

          img:last-of-type {
            width: 10px;
            height: 18px;
            margin-left: 10px;
          }
        }

      }

    }

    .centent-line-two {
      padding-top: 18px;
      display: flex;

      .centent-one-box,
      .centent-two-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
      }

      .centent-one-box {
        margin-left: 65px;
        width: 118px;
        height: 118px;
        background: url('~@/assets/images/interviewAnalysis/left-top-bg-one.png');
      }

      .centent-two-box {
          margin-left: 75px;
          width: 118px;
          height: 118px;
          background: url('~@/assets/images/interviewAnalysis/left-top-bg-two.png');
      }

      .centent-inside {
        padding-left: 5px;
        width: 51px;
        height: 38px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        div:first-of-type {
          width: 40px;
          height: 18px;
          font-size: 18px;
          color: #ffffff;
          font-weight: bold;
        }

        div:nth-child(2) {
          margin-top: 8px;
          width: 51px;
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: #A1D8FF;
        }
      }
    }

    .count1 {
      display: flex;
      line-height: 54px;
      font-size: 16px;
      color: #A1D8FF;
      margin: 10px 0 0 30px;
    }
    .count2 {
      display: flex;
      margin-top: 20px;
      .mes {
        width: 125px;
        height: 110px;
        padding-top: 20px;
        color: #fff;
        font-size: 24px;
        margin-right: 25px;
        line-height: 40px;
        background: url('~@/assets/images/policeAnalysis/mes-bg.png')no-repeat center;
        background-size: 100% 100%;
        text-align: center;
        font-weight: bold;
        div {
          color: #A1D8FF;
          font-weight: normal;
          font-size: 16px;
        }
      }
    }

    .origin {

      .tip {
        position: absolute;
        left: 19.5%;
        top: 48%;
        width: 40px;
        font-size: 15px;
        color: #A9DAFF;
        font-weight: 400;
      }

      .echarts {
        width: 400px;
        height: 220px;
      }
    }

  }

  .info-background {
    position: relative;
    background: url("~@/assets/images/situation/cir.png") no-repeat 59px 109px;
    background-size: 19% 30%;
  }
}
</style>
