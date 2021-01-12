<template>
  <div
    class="info-block"
    :style="blockStyleObj"
  >
    <div class="info-top">
      <div class="top-left">
        <i class="title-icon" />
        <span class="info-title">{{ title }}</span>
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
      default: '420px'
    },
    height: {
      type: [String],
      default: '270px'
    },
    bgUrl: {
      type: [String],
      default: require('@/assets/images/common/info-block-bg.png')
    },
    contentStyleObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {
    blockStyleObj () {
      return {
        width: this.width,
        height: this.height,
        background: 'url(' + this.bgUrl + ') no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  .info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(
      90deg,
      rgba(2, 16, 46, 0.075) 0%,
      rgba(0, 162, 255, 0.075) 100%
    );
    .title-icon {
      display: inline-block;
      width: 10px;
      height: 16px;
      background: url('~@/assets/images/common/info-block-title-icon.png');
      background-size: 100% 100%;
      vertical-align: middle;
    }

    .info-title {
      color: #fff;
      font-size: 16px;
      margin-left: 10px;
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 40px);
    padding: 0 15px 15px 15px;
  }
}
</style>
