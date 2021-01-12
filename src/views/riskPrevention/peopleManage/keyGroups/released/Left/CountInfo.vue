<template>
  <InfoBlock
    title="人员概况"
    height="276px"
  >
    <div class="mes">
      {{ title }}总数
      <div class="count">
        {{ count }}
        <span>人</span>
      </div>
    </div>
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
  </InfoBlock>
</template>

<script>
import { queryReleasedCount } from '@/api/riskPrevention/peopleManage/keyGroups'
export default {
  data () {
    return {
      count: 10960,
      count1: 102,
      count2: 10858,
      title: '刑释解戒人员'
    }
  },
  methods: {
    getList () {
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
.list {
  margin: 10px 20px 0;
  z-index: 9;
  .list-item {
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    background: url("~@/assets/images/keyGroups/list-bg.png") no-repeat
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
</style>
