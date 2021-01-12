<template>
  <transition name="ani">
    <div class="form-container">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SearchAdvance',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 500px;
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: rgba(48, 65, 86, 1);
  opacity: 0.9;
  padding: 24px;
  z-index: 2000;

  &::v-deep .el-form-item__label {
    color: #fff;
  }

  &::v-deep .el-input__inner {
    color: #fff;
    background-color: rgba(48, 65, 86, 1);
  }

  &::v-deep .el-select {
    width: 100%;
  }

  &::v-deep .el-date-editor {
    width: 100%;
  }

  &::v-deep .el-cascader {
    width: 100%;
  }

  &::v-deep .el-form-item {
    margin-bottom: 14px;
  }

  &::v-deep .buttons {
    text-align: right;

    .el-button--mini {
      padding: 7px 10px;
    }
  }
}

// 过渡动画 横向渐变
.ani-leave-active,
.ani-enter-active {
  transition: all 0.3s ease-in-out;
}

.ani-enter,
.ani-leave-to {
  opacity: 0;
  transform: translateX(500px);
}
</style>
