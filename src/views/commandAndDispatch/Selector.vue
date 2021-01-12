<template>
  <div class="select">
    <div
      class="item"
      :class="activeIndex===0&&'active'"
      @click="switchSelected(0)"
    >
      {{ btns[0] }}
    </div>
    <div
      class="item"
      :class="activeIndex===1&&'active'"
      @click="switchSelected(1)"
    >
      {{ btns[1] }}
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['btns'],
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    switchSelected (index) {
      if (this.activeIndex === index) return false
      this.activeIndex = index
      if (index === 0) {
        this.$emit('bindSelectOne')
      } else if (index === 1) {
        this.$emit('bindSelectTwo')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  background: url('~@/assets/images/common/selector-bg.png') no-repeat;
  padding-top: 5px;
  padding-right: 15px;
  background-position: right;
  .item {
    position: relative;
    font-size: 12px;
    padding: 1px 8px;
    z-index: 2;
    cursor: pointer;
    color: #ffffff;
    &.active {
      color: #000;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #00ffff;
        transform: skewX(45deg);
      }
    }
  }
}
</style>
