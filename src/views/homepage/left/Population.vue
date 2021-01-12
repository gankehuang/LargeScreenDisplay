<template>
  <div class="sit-overview">
    <div class="total">
      <svg-icon
        icon-class="person"
        class="icon"
      />
      <span class="label">实有人口</span>
      <span class="num">1854515<i>人</i></span>
    </div>
    <div class="sit-overview-list">
      <div
        v-for="(item,index) in dataArr"
        :key="index"
        class="sit-data"
      >
        <div class="title">
          {{ item.label }}
        </div>
        <div class="number">
          {{ item.num }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr: [
        {
          label: '户籍人口',
          num: 492546
        },
        {
          label: '流动人口',
          num: 42014
        },
        {
          label: '重点人员',
          num: 1522
        },
        {
          label: '关爱人员',
          num: 42354
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sit-overview {
  width: 100%;
  height: 100%;
}

.sit-overview-list {
  width: 369px;
  height: 160px;
  margin: 10px 0 0 0;
  padding: 0 20px;
  background: url('~@/assets/images/homepage/situation(5).png') center center /
    100% 100% no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.total {
  width: 100%;
  margin: 20px 0 0 0;
  padding: 0 20px;

  .label,
  .num {
    display: inline-block;
    margin: 0 5px;
  }
  .icon {
    color: #0c68b2;
    font-size: 16px;
  }
  .label {
    font-size: 16px;
    color: #a1d8ff;
  }
  .num {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
}

.sit-data {
  width: 50%;

  &:nth-of-type(2n) {
    text-align: right;
  }

  .title {
    font-size: 16px;
    color: #a1d8ff;
    line-height: 36px;
  }
  .number {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    line-height: 28px;
  }
}
</style>
