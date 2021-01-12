<template>
  <InfoBlockTwo
    title="事件办理排行"
    height="295px"
  >
    <div class="col-title-box">
      <div class="title-item">
        镇街名称
      </div>
      <div class="title-item">
        事件数
      </div>
      <div class="title-item">
        办结率
      </div>
    </div>
    <div class="item">
      <div class="item-left">
        <span class="item-rank-num">
          1
        </span>
        <span class="item-title">凤凰街道</span>
      </div>

      <span class="item-num">92983</span>
      <span class="item-rate">40%</span>
    </div>
    <div class="item">
      <div class="item-left">
        <span class="item-rank-num">
          2
        </span>
        <span class="item-title">八一街道</span>
      </div>

      <span class="item-num">82983</span>
      <span class="item-rate">57%</span>
    </div>
    <div class="item">
      <div class="item-left">
        <span class="item-rank-num">
          3
        </span>
        <span class="item-title">后埠街道</span>
      </div>

      <span class="item-num">72983</span>
      <span class="item-rate">10%</span>
    </div>
    <div class="item">
      <div class="item-left">
        <span class="item-rank-num">
          4
        </span>
        <span class="item-title">城郊管委会</span>
      </div>

      <span class="item-num">1983</span>
      <span class="item-rate">12%</span>
    </div>
    <div class="item">
      <div class="item-left">
        <span class="item-rank-num">
          5
        </span>
        <span class="item-title">青山镇</span>
      </div>

      <span class="item-num">783</span>
      <span class="item-rate">23%</span>
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
.col-title-box {
  display: flex;
  margin-bottom: 15px;
  color: #008AFF;
  .title-item {

    font-size: 16px;
    &:nth-child(1) {
      flex: 0 0 50%;
    }
    &:nth-child(2) {
      flex: 0 0 30%;
    }
    &:nth-child(3) {
      flex: 0 0 20%;
    }
  }
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
  .item-left {
    flex: 0 0 50%;
    .item-title {
      font-size: 16px;
      color: #A1D8FF;
      padding-left: 10px;
    }

    .item-rank-num {
      display: inline-block;
      flex: 0 0 30%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: rgba(3, 61, 156, 0.36);
      border: 1px solid #033D9C;
      border-radius: 50%;
      font-size: 16px;
      color: #A1D8FF;
    }
  }

  &:nth-of-type(2) {
    .item-rank-num {
      background: rgba(254, 40, 33, 0.36);
      border: 1px solid #FE2821;
    }
  }

  &:nth-of-type(3) {
    .item-rank-num {
      background: rgba(233, 170, 0, 0.36);
      border: 1px solid #E9AA00;
    }
  }

  &:nth-of-type(4) {
    .item-rank-num {
      background: rgba(0, 136, 245, 0.36);
      border: 1px solid #0088F5;
    }
  }

  .item-num {
    flex: 0 0 30%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
  .item-rate {
    flex: 0 0 20%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
