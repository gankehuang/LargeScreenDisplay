<template>
  <InfoBlockTwo
    title="民生问题突出领域"
    height="290px"
  >
    <div class="item">
      <div>
        <span class="item-rank-num">
          1
        </span>
        <span class="item-title">青山镇餐馆行业大罢工</span>
      </div>

      <span class="item-num">3467</span>
    </div>
    <div class="item">
      <div>
        <span class="item-rank-num">
          2
        </span>
        <span class="item-title">城郊管委会建筑行业烂尾问题</span>
      </div>

      <span class="item-num">2571</span>
    </div>
    <div class="item">
      <div>
        <span class="item-rank-num">
          3
        </span>
        <span class="item-title">凤凰街道餐馆行业大罢工</span>
      </div>

      <span class="item-num">987</span>
    </div>
    <div class="item">
      <div>
        <span class="item-rank-num">
          4
        </span>
        <span class="item-title">丹江街道安全防范所措施推延问题</span>
      </div>

      <span class="item-num">345</span>
    </div>
    <div class="item">
      <div>
        <span class="item-rank-num">
          5
        </span>
        <span class="item-title">青山镇餐馆行业大罢工</span>
      </div>

      <span class="item-num">289</span>
    </div>
  </InfoBlockTwo>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  margin-bottom: 25px;
  .item-rank-num {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    font-size: 16px;
    color: #A1D8FF;
    background: rgba(3, 61, 156, 0.36);
    border: 1px solid #033D9C;
  }
  &:nth-child(1) {
    .item-rank-num {
      background: rgba(254, 40, 33, 0.36);
      border: 1px solid #FE2821;
    }
  }
  &:nth-child(2) {
    .item-rank-num {
      background: rgba(233, 170, 0, 0.36);
      border: 1px solid #E9AA00;
    }
  }
  &:nth-child(3) {
    .item-rank-num {
      background: rgba(0, 136, 245, 0.36);
      border: 1px solid #0088F5;
    }
  }
  .item-title {
    font-size: 16px;
    color: #A1D8FF;
    padding-left: 10px;
  }
  .item-num {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
