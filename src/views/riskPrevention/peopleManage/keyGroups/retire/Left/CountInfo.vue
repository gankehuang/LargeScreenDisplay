<template>
  <InfoBlock
    title="人员概况"
    height="327px"
  >
    <div class="mes">
      {{ title }}数量
      <div class="count">
        {{ count }}
        <span>人</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item">
        <div class="flex-item1">
          <span>进藏退伍兵</span>
        </div>
        <div class="flex-item2">
          {{ count1 }}
          <span>人</span>
        </div>
        <!-- <div class="flex-item1">
          <span>骨干</span>
        </div>
        <div class="flex-item2">
          {{ count1 - 10 }}
          <span>人</span>
        </div> -->
        <img
          style="margin: 13px 0 0 80px; width: 30px;height: 24px;"
          src="@/assets/images/keyGroups/xf-icon.png"
        >
      </div>
      <div class="list-item">
        <div class="flex-item1">
          <span>两参退役人员</span>
        </div>
        <div class="flex-item2">
          {{ count2 }}
          <span>人</span>
        </div>
        <!-- <div class="flex-item1">
          <span>骨干</span>
        </div>
        <div class="flex-item2">
          {{ count2 - 10 }}
          <span>人</span>
        </div> -->
        <img
          style="margin: 13px 0 0 80px; width: 30px;height: 24px;"
          src="@/assets/images/keyGroups/xf-icon.png"
        >
      </div>
      <div class="list-item">
        <div class="flex-item1">
          <span>其它</span>
        </div>
        <div class="flex-item2">
          {{ count - count1 - count2 }}
          <span>人</span>
        </div>
        <!-- <div class="flex-item1">
          <span>骨干</span>
        </div>
        <div class="flex-item2">
          {{ count - count1 - count2 - 72 }}
          <span>人</span>
        </div> -->
        <img
          style="margin: 13px 0 0 80px; width: 30px;height: 24px;"
          src="@/assets/images/keyGroups/xf-icon.png"
          alt=""
        >
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { queryRetiredDistributed } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      count: 116,
      count1: 32,
      count2: 72,
      title: '退役重点人员'
    }
  },
  methods: {
    getList () {
      queryRetiredDistributed().then(res => {
        if (res.status === 200) {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin: 10px 20px 0;
  z-index: 9;
  .list-item {
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    background: url("~@/assets/images/keyGroups/xf-item-bg.png") no-repeat
    center;
    background-size: 100% 100%;
    font-size: 16px;
    .flex-item1 {
      padding-left: 10px;
      width: 114px;
      height: 33px;
      margin: 8px 0 0 15px;
      background-size: 100% 100%;
      span {
        display: block;
        line-height: 35px;
        color: #aadaff;
      }
    }
    .flex-item2 {
      margin-left: 17px;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      color: #18fbff;
      font-weight: bold;
      span {
        font-size: 12px;
        color: #aadaff;
      }
      &:last-child {
        color: #3b9afe;
      }
    }
  }
}
.mes {
  margin-left: 20px;
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
</style>
