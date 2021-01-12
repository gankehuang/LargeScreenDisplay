<!-- 科辅决策 平安指数 右侧一级指数内卡片样式 -->
<template>
  <div class="card-container">
    <div class="card-block">
      <div>
        <div :style="iconUrl" />
      </div>
      <div style="marginLeft: 20px">
        <div class="card-number">
          {{ number }}
        </div>
        <div
          class="card-title"
          style="marginTop: 5px"
        >
          {{ name }}
        </div>
      </div>
    </div>
    <el-progress
      class="el-progress"
      :stroke-width="10"
      :percentage="progress.num"
    />
  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: [Object],
      default: () => { }
    },
    name: {
      type: [String],
      required: true
    },
    icon: {
      type: [String],
      required: true,
      default: require('@/assets/images/scienceToPolicy/right-top-one.png')
    },
    number: {
      type: [Number],
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    iconUrl () {
      return {
        background: 'url(' + this.icon + ') no-repeat',
        width: '42px',
        height: '48px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-container {
  position: relative;
  height: 108px;
  width: 188px;
  padding: 20px 10px;
  background: url('~@/assets/images/scienceToPolicy/right-top-bg.png');
}
.card-block {
  display: flex;
  justify-content: center;

  .card-number {
    width: 72px;
    height: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    line-height: 28px;
  }

  .card-title {
    color: #9acff5;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
  }
}

.el-progress {
  display: inline-block;
  margin: 0 5px;
}

.el-progress {
  padding-top: 5px;
  margin-right: 20px;

  /deep/.el-progress__text {
    display: none;
  }
  /deep/.el-progress-bar__outer {
    width: 150px;
    border-radius: 0;
    background-color: #0075ab;
  }
  /deep/.el-progress-bar__inner {
    border-radius: 0;
    background: linear-gradient(90deg, #3b9afe 0%, #00ffff 100%) !important;
  }
}
</style>
