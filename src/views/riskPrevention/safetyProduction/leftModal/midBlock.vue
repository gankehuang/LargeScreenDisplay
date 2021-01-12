<!-- 危险源组件 -->
<template>
  <div class="mid-block">
    <div
      v-for="(item, index) in content"
      :key="index"
      class="mid-block-content"
    >
      <div class="mid-block-img-box">
        {{ item.value }}
      </div>
      <div class="mid-block-title">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>

/**
 * @param content 接受一个数组,0: 危险源总数,1: 一般危险源数,2: 重大危险源数
 */

export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      content: [
        { name: '危险源总数', value: this.value[0] },
        { name: '一般危险源数', value: this.value[1] },
        { name: '重大危险源数', value: this.value[2] }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .mid-block {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .mid-block-content {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      .mid-block-img-box {
        width: 112px;
        height: 112px;
        background: url('~@/assets/images/safetyProduction/left-mid-img.png') no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #D0DFFF;
        font-size: 24px;
      }

      .mid-block-title {
        font-size: 16px;
        color: #A1D8FF;
        padding-top: 10px;
      }
    }
  }
</style>
