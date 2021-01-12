<template>
  <div
    class="info-block-two"
    :style="blockStyleObj"
  >
    <div class="info-top">
      <div class="info-title">
        {{ title }}
      </div>
      <slot name="topRight" />
    </div>

    <div
      class="content"
      :style="contentStyleObj"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
      default: '默认标题'
    },
    width: {
      type: [String],
      default: '400px'
    },
    height: {
      type: [String],
      default: '280px'
    },
    contentStyleObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  computed: {
    blockStyleObj () {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block-two {
  position: relative;
  .info-top {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 100%;
    background: url('~@/assets/images/common/info-block-two-title-bg.png') no-repeat;
    background-size: contain;
    .info-title {
      padding-left: 25px;
      color: #D0DFFF;
      font-size: 16px;
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 40px);
    padding: 15px;
  }
}
</style>
