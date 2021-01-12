<template>
  <InfoBlockTwo title="事件概况">
    <div class="event-num">
      <span class="num-label">事件总数</span>
      <VerticalNumTo />
    </div>
    <div class="main-content">
      <div class="content-left">
        <div class="item">
          <div class="item-left">
            <i class="item-icon" />
            <span class="item-label">办结数</span>
          </div>
          <div class="item-right">
            <span class="item-num">871</span>
            <span class="item-unit">件</span>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <i class="item-icon" />
            <span class="item-label">未办结数</span>
          </div>
          <div class="item-right">
            <span class="item-num">971</span>
            <span class="item-unit">件</span>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <i class="item-icon" />
            <span class="item-label">未办逾期数</span>
          </div>
          <div class="item-right">
            <span class="item-num">567</span>
            <span class="item-unit">件</span>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="rate-box">
          <span class="rate-num">29%</span>
          <span class="rate-text">办结率</span>
        </div>
      </div>
    </div>
  </InfoBlockTwo>
</template>

<script>
import VerticalNumTo from '@/components/VerticalNumTo'
export default {
  components: {
    VerticalNumTo
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.event-num {
  display: flex;
  align-items: center;
  color: #A1D8FF;
  .num-label {
    margin-right: 15px;
    font-size: 16px;
  }
  /deep/ .vertical-num-to {
    /deep/ .number {
      top: 0;
    }
  }
}

.main-content {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #A1D8FF;
  .content-left {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item-left {
      display: flex;
      align-items: center;
      .item-icon {
        width: 30px;
        height: 30px;
        background: url('~@/assets/images/servingMasses/left1-item-icon.png') no-repeat;
        background-size: 100% 100%;
      }
      .item-label {
        font-size: 16px;
        padding-left: 10px;
      }
    }

    .item-right {
      color: #fff;
      padding-left: 40px;
      .item-num {
        font-size: 20px;
      }
    }
  }
  .content-right {
    position: relative;
    width: 118px;
    height: 118px;
    background: url('~@/assets/images/servingMasses/left1-rate-bg.png') no-repeat;
    background-size: 100% 100%;
    .rate-box {
      position: absolute;
      left: 50%;
      top: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      & > span {
        display: block;
      }
      .rate-num {
        font-size: 22px;
        color: #fff;
      }
      .rate-text {
        font-size: 16px;
        color: #A1D8FF;
      }
    }
  }
}
</style>
