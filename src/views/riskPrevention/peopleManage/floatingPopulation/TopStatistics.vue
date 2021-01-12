<template>
  <div class="populations">
    <div class="population">
      流动人口
      <span>748837</span>
    </div>
    <div class="population">
      省内流入
      <span>599069</span>
    </div>
    <div class="population">
      省外流入
      <span>149768</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.populations {
  width: 40%;
  z-index: 1;
  position: absolute;
  top: 135px;
  left: 220px;
  .population {
    width: 250px;
    display: flex;
    align-items: center;
    text-align: center;
    padding-top: 15px;
    // background: url("~@/assets/images/keyGroups/population-bg.png")
    //   no-repeat PageCenter;
    // background-size: 100% 100%;
    margin: 0 auto;
    line-height: 35px;
    font-size: 18px;
    color: #aadaff;
    font-weight: bold;
    text-align: center;
    span {
      display: inline-block;
      margin-left: 10px;
      font-size: 30px;
      color: #f7bd10;
    }
  }
}
</style>
