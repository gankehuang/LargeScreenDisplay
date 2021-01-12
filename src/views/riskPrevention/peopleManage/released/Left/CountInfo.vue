<template>
  <div class="win-info">
    <div class="title">人员概况</div>
    <div class="mes">
      {{ title }}总数
      <div class="count">
        {{ count }}
        <span>人</span>
      </div>
    </div>
    <!-- <img
      src="@/assets/image/importPeople/xsjj-icon.png"
      class="right-icon"
      alt=""
    /> -->
    <div class="list">
      <div class="list-item">
        <div class="flex-item1">
          <span>暴力犯罪</span>
        </div>
        <div class="flex-item2">
          {{ count1 }}
          <span>人</span>
        </div>
      </div>
      <div class="list-item">
        <div class="flex-item1 bg2">
          <span>非暴力犯罪</span>
        </div>
        <div class="flex-item2">
          {{ count2 }}
          <span>人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryReleasedCount } from '@/api/riskPrevention/importPeople'
export default {
  props: {
    type: String
  },
  data() {
    return {
      count: 10960,
      count1: 102,
      count2: 10858,
      title: '刑释解戒人员'
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList() {
      queryReleasedCount().then(res => {
        if (res.status === 200) {
          this.count = res.data[0].numVal
          this.count1 = res.data[1].numVal
          this.count2 = res.data[2].numVal
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 276px;
  background: url("~@/assets/image/importPeople/js-left-bg1.png") no-repeat
    center center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .mes {
    margin: 54px 0 0 38px;
    line-height: 44px;
    font-size: 18px;
    color: #aadaff;
    font-weight: bold;
    .count {
      display: inline-block;
      margin: 0 13px 0 30px;
      font-size: 30px;
      color: #17fcff;
      span {
        font-size: 16px;
        color: #aadaff;
      }
    }
  }
  .right-icon {
    position: absolute;
    top: 44px;
    right: 28px;
    width: 98px;
    height: 63px;
    z-index: 8;
  }
  .list {
    margin: 10px 20px 0;
    z-index: 9;
    .list-item {
      height: 50px;
      margin-bottom: 20px;
      display: flex;
      background: url("~@/assets/image/importPeople/list-bg.png") no-repeat
        center;
      background-size: 100% 100%;
      font-size: 16px;
      .flex-item1 {
        padding-left: 10px;
        width: 134px;
        height: 33px;
        margin: 8px 0 0 19px;
        background-size: 100% 100%;
        span {
          display: block;
          line-height: 35px;
          color: #aadaff;
        }
      }
      .flex-item2 {
        margin-left: 47px;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        color: #18fbff;
        font-weight: bold;
        span {
          font-size: 12px;
          color: #aadaff;
        }
      }
    }
  }
}
</style>
