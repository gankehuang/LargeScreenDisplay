<template>
  <div class="rank-progress-block">
    <img
      class="index-icon"
      :src="progress.image"
    >
    <span class="label">{{ progress.label }}</span>
    <el-progress
      class="el-progress"
      :stroke-width="10"
      :percentage="progress.num"
    />
    <span class="num">{{ progress.num }}</span>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-progress-block {
  width: 100%;
  margin: 20px auto;
  padding: 0 15px;

  .index-icon,
  .el-progress,
  .label,
  .num {
    display: inline-block;
    margin: 0 5px;
  }
  .label {
    width: 100px;
    font-size: 18px;
    color: #a1d8ff;
    line-height: 28px;
  }
  .index-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: top;
  }
  .el-progress {
    padding-top: 5px;
    margin-right: 20px;

    /deep/.el-progress__text {
      display: none;
    }
    /deep/.el-progress-bar__outer {
      width: 160px;
      border-radius: 0;
      background-color: #0075ab;
    }
    /deep/.el-progress-bar__inner {
      border-radius: 0;
      background: linear-gradient(90deg, #3b9afe 0%, #00ffff 100%) !important;
    }
  }
  .num {
    font-size: 18px;
    font-weight: bold;
    color: #feffff;
    line-height: 28px;
  }
}
</style>
