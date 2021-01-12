<template>
  <div class="leftOne">
    <div class="con-bottom">
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="con-bottom-list"
      >
        <p class="name">
          {{ item.name }}
        </p>
        <p class="num">
          {{ item.num }}
        </p>
        <p class="progress">
          <el-progress :percentage="item.percentage" />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lists: [
        {
          name: '网媒',
          num: '1132',
          percentage: 65.32
        },
        {
          name: '论坛',
          num: '387',
          percentage: 22.33
        },
        {
          name: 'APP',
          num: '78',
          percentage: 4.5
        },
        {
          name: '微博',
          num: '55',
          percentage: 3.17
        },
        {
          name: '其它',
          num: '81',
          percentage: 4.68
        }
        // {
        //   name: '纸媒',
        //   num: '52',
        //   percentage: 3.0
        // },
        // {
        //   name: '微信',
        //   num: '29',
        //   percentage: 1.67
        // },
        // {
        //   name: '博客',
        //   num: '0',
        //   percentage: 0
        // }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.leftOne {
  .con-bottom {
    width: 387px;
    // height: 305px;
    margin-top: 10px;
    // background: url('~@/assets/images/publicMonitor/oneBox.png') no-repeat PageCenter
    // PageCenter;
    // background-size: 100% 100%;
    .con-bottom-list {
      display: flex;
      align-items: center;
      padding: 10px 15px 0 15px;
      p {
        margin: 0;
        padding: 0;
      }
      .name {
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        line-height: 33px;
        margin: 0 10px;
      }
      .num {
        width: 42px;
        font-size: 18px;
        font-weight: bold;
        color: #a9daff;
        line-height: 25px;
        margin-right: 10px;
      }
      .progress {
        width: 250px;
        /deep/.el-progress-bar {
          width: 230px !important;
        }
        /deep/.el-progress-bar__outer {
          height: 12px !important;
          background-color: #001c3d !important;
        }
        /deep/.el-progress__text {
          width: 60px !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          color: #a9daff !important;
          line-height: 33px !important;
          margin-left: 25 !important;
        }
      }
    }
  }
}
</style>
