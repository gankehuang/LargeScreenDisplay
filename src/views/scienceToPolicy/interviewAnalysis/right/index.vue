<template>
  <div class="right">
    <div class="info">
      <div class="title">
        访情分析报告
      </div>
      <div
        v-for="(item, index) in report"
        :key="index"
        class="report-list"
      >
        <div class="report-item">
          <div class="item-left">
            {{ item.name }}
            <div class="time">
              {{ item.time }}
            </div>
          </div>
          <img
            src="@/assets/images/policeAnalysis/download.png"
            alt=""
            style="cursor:pointer"
          >
        </div>
      </div>
    </div>
    <div class="info info-background">
      <div class="title">
        信访问题突出领域
      </div>
      <div class="outstanding">
        <v-chart :options="options" />
        <span class="tip">突出领域</span>
      </div>
    </div>
    <div class="info">
      <div class="title">
        重点信访案件
      </div>
      <div class="mes-list">
        <div
          v-for="(item,index) in focalPoint"
          :key="index"
          class="mes-item"
        >
          <div class="dot" />
          <div class="name text-overflow">
            {{ item.name }}
          </div>
          <div class="mes-time">
            {{ item.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// 加载模拟数据
import { report, focalPoint, dataList } from './mock'

export default {
  components: {
  },
  data () {
    return {
      report: report,
      focalPoint: focalPoint
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
            name: '信访个数',
            type: 'pie',
            radius: ['60%', '85%'],
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
  }
}
</script>
<style lang="scss" scoped>
.right {
  width: 23%;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
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

  .info-background {
    position: relative;
    background: url("~@/assets/images/situation/cir.png") no-repeat 62px 96px;
    background-size: 25% 37%;
  }

  .info {
    height: 33%;

    .outstanding {
      margin-top: 15px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;

      .tip {
        position: absolute;
        left: 23%;
        top: 46%;
        width: 40px;
        font-size: 16px;
        color: #A9DAFF;
        font-weight: bold;
      }

      .echarts {
        width: 400px;
        height: 190px;
      }
    }
    .report-list {
      .report-item {
        margin-top: 15px;
        display: flex;
        .item-left {
            padding-left: 25px;
            flex: 1;
            line-height: 30px;
            font-size: 18px;
            color: #A1D8FF;
            .time {
              font-size: 14px;
              color: #008AFF
            }
        }
        img {
          width: 30px;
          height: 30px;
          margin: 10px 20px;
        }
      }
    }
    .mes-list {
      margin-top: 15px;
      .mes-item {
        padding-left: 15px;
        display: flex;
        margin-bottom: 15px;
        cursor: pointer;
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #A1D8FF;
          margin: 6px 10px;
        }
        .name {
          width: 224px;
          line-height: 20px;
          font-size: 16px;
          color: #A1D8FF;
        }
        .mes-time {
          flex: 1;
          line-height: 20px;
          text-align: right;
          color: #A1D8FF;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
