<template>
  <div class="StatisticalData">
    <div class="population">
      <p class="title">
        748837
      </p>
      <p class="num">
        流动人口
      </p>
    </div>
    <div class="population">
      <p class="title">
        599069
      </p>
      <p class="num">
        省内流入
      </p>
    </div>
    <div class="population">
      <p class="title">
        149768
      </p>
      <p class="num">
        省外流入
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.StatisticalData {
  display: flex;
  width: 420px;
  justify-content: space-between;
  .population {
    width: 133px;
    height: 107px;
    text-align: center;
    background: url('~@/assets/images/floatingPopulation/组 6341.png') center
      center / 100% 100% no-repeat;
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
    }
    .num {
      font-size: 16px;
      font-weight: 400;
      color: #a1d8ff;
    }
  }
}
</style>
