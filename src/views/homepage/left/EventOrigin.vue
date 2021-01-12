<template>
  <div class="sit-event-origin">
    <div class="content-center">
      <span class="tip">来源</span>
      <div class="info-content">
        <div
          v-for="(item,index) in dataList"
          :key="index"
          class="data-item"
        >
          <span class="label">{{ item.label }}</span>
          <span class="num">{{ item.num }}<b>件</b></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          label: '群众上报',
          num: 135
        },
        {
          label: '网格员上报',
          num: 35
        },
        {
          label: '智能预警',
          num: 57
        }, {
          label: '部门系统流转',
          num: 0
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-event-origin {
  display: flex;
  align-items: center;
  justify-content: center;

  .content-center {
    position: relative;
    top: 20px;
    width: 332px;
    height: 187px;
    background: url('~@/assets/images/homepage/situation(12).png') center center /
      100% 100% no-repeat;
  }
  .tip {
    position: absolute;
    top: 85px;
    left: 23px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    line-height: 28px;
  }
  .info-content {
    position: absolute;
    top: -5px;
    left: 100px;
  }
  .data-item {
    width: 200px;
    display: flex;
    align-items: center;
    margin: 20px 0;

    &:nth-of-type(3),
    &:nth-of-type(4) {
      margin: 23px 0;
    }

    .label {
      width: 50%;
      font-size: 16px;
      color: #a1d8ff;
    }
    .num {
      width: 50%;
      text-align: right;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
