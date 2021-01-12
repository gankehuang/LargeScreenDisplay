<template>
  <div class="page-box nav">
    <div
      class="nav-item"
      @click="navChange(1)"
    >
      <p :class="{'select':navStatus==1}">
        人员布控
      </p>
      <div class="img-box">
        <img
          v-show="navStatus==1"
          src="@/assets/images/personControl/dbx.png"
        >
      </div>
    </div>
    <div
      class="nav-item"
      @click="navChange(2)"
    >
      <p :class="{'select':navStatus==2}">
        车辆布控
      </p>
      <div class="img-box">
        <img
          v-show="navStatus==2"
          src="@/assets/images/personControl/dbx.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navStatus: 1
    }
  },
  methods: {
    navChange (val) {
      this.navStatus = val
      this.$emit('bindSelect', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav{
  position: absolute;
  top: 60px;
  width: 94%;
  height: 36px;
  margin: 20px 50px;
  border-bottom: 2px solid #13476A;

  .nav-item {
    display: inline-block;
    text-align: center;
    height: 50px;
    vertical-align: top;
    color: #ffffff;
    cursor: pointer;

    p{
      width: 120px;
      height: 36px;
      margin: 0;
      line-height: 36px;
      text-align: center;
      background-color: #243142;
    }
    .img-box{
      width: 100px;

      img {
        width: 20px;
      }
    }

  }
}
.select{
  background-color: #0893DC !important;
}
</style>
