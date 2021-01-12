<template>
  <div class="title-block">
    <div
      :class="['left',{active:seleCom==='Rank'}]"
      @click="tab('Rank')"
    >
      镇街综合排名
    </div>
    <div
      :class="['right',{active:seleCom==='Report'}]"
      @click="tab('Report')"
    >
      反馈整改报告
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seleCom: {
      type: String,
      default: 'Rank'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    tab (tab) {
      this.$emit('update:seleCom', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.title-block {
  position: absolute;
  z-index: 20;
  width: 420px;
  height: 40px;

  .left,
  .right {
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #a1d8ff;
    line-height: 40px;
    &.active {
      color: #d0dfff;
    }
  }
  .left {
    position: relative;
    top: 0;
    left: 0;
    width: 219px;
    height: 40px;
    background: url('~@/assets/images/safeIndex/safeIndex(1).png') center center /
      100% 100% no-repeat;

    &.active {
      z-index: 10;
      background: transparent;
    }
  }
  .right {
    position: relative;
    top: -40px;
    right: -182px;
    width: 219px;
    height: 40px;
    background: url('~@/assets/images/safeIndex/safeIndex(2).png') center center /
      100% 100% no-repeat;
    &.active {
      z-index: 10;
      background: transparent;
    }
  }
}
</style>
