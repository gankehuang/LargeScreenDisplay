<template>
  <div class="right">
    <div class="info">
      <div class="title">
        警情分析报告
      </div>
      <div class="report-list">
        <div class="report-item">
          <div class="item-left">
            2020年12月警情分析报告
            <div class="time">
              2021.01.02
            </div>
          </div>
          <img
            src="@/assets/images/policeAnalysis/download.png"
            alt=""
          >
        </div>
        <div class="report-item">
          <div class="item-left">
            2020年11月警情分析报告
            <div class="time">
              2020.12.01
            </div>
          </div>
          <img
            src="@/assets/images/policeAnalysis/download.png"
            alt=""
          >
        </div>
        <div class="report-item">
          <div class="item-left">
            2020年10月警情分析报告
            <div class="time">
              2020.11.02
            </div>
          </div>
          <img
            src="@/assets/images/policeAnalysis/download.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        警情问题突出领域
      </div>
      <div class="lists">
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/1.png"
            alt=""
          >
          交通类警情
          <div class="num">
            1028596
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/2.png"
            alt=""
          >
          行政警情
          <div class="num">
            829568
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/3.png"
            alt=""
          >
          举报
          <div class="num">
            72845
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/4.png"
            alt=""
          >
          刑事警情
          <div class="num">
            1983
          </div>
        </div>
        <div class="list">
          <img
            src="@/assets/images/policeAnalysis/5.png"
            alt=""
          >
          救助
          <div class="num">
            782
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        重点警情
      </div>
      <div class="mes-list">
        <div
          v-for="(item,index) in mesList"
          :key="index"
          class="mes-item"
        >
          <div class="dot" />
          <div class="name">
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
export default {
  components: {
  },
  data () {
    return {
      mesList: [
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        },
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        },
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        },
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        },
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        },
        {
          name: '井冈山大道发生火灾',
          time: '2020.12.21'
        }
      ]
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
  .info {
    height: 33%;
    .lists {
      margin-top: 15px;
      .list {
        display: flex;
        margin-bottom: 13px;
        line-height: 24px;
        font-size: 16px;
        color: #A1D8FF;
        img {
          display: block;
          margin: 0 11px 0 25px;
        }
        .num {
          flex: 1;
          text-align: right;
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }
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
