<template>
  <!-- 顶级导航 -->
  <div
    v-if="topNavVisible"
    class="top-nav"
  >
    <div class="nav-left">
      <i class="router-arrow" />
      <router-link
        class="router-item"
        :to="{ path: '/situation/index' }"
      >
        <span>治理态势</span>
      </router-link>
      <i class="division-line" />
      <router-link
        class="router-item"
        :to="{ path: '/riskPrevention/index' }"
      >
        <span>风险防范</span>
      </router-link>
      <i class="division-line" />
      <router-link
        class="router-item"
        :to="{ path: '/commandAndDispatch/index' }"
      >
        <span>指挥调度</span>
      </router-link>
    </div>

    <div class="nav-right">
      <router-link
        class="router-item"
        :to="{ path: '/servingMasses/mattersHandling' }"
      >
        <span>惠民服务</span>
      </router-link>
      <i class="division-line" />
      <router-link
        class="router-item"
        :to="{ path: '/intelligentJudge/index' }"
      >
        <span>智能研判</span>
      </router-link>
      <i class="division-line" />
      <router-link
        class="router-item"
        :to="{ path: '/scienceToPolicy/safeIndex' }"
      >
        <span>科辅决策</span>
      </router-link>
      <i class="router-arrow" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topNavVisible: true
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:mapVisible')
  },
  created () {
    this.updateTopNavVisible()
  },
  methods: {
    updateTopNavVisible () {
      console.log('--------------------------')
      this.$nextTick(() => {
        this.$EventBus.$on('update:mapVisible', (res) => {
          this.topNavVisible = !res
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-nav {
  position: fixed;
  top: 45px;
  left: 50%;
  width: 60%;
  margin-left: -30%;
  height: 97px;
}
.router-item {
  width: 109px;
  height: 36px;
  line-height: 36px;
  display: inline-block;

  span {
    display: block;
    font-size: 18px;
    font-weight: bolder;
    background-image: linear-gradient(0deg, #72bdff 0%, #f1feff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.division-line {
  display: inline-block;
  width: 2px;
  height: 23px;
  background: url('~@/assets/images/layout/router-division-line.png') no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
  margin: 0 4px;
}
.router-arrow {
  display: inline-block;
  width: 21px;
  height: 27px;
  vertical-align: middle;
}
.nav-left {
  position: absolute;
  left: calc(50% - 245px);
  bottom: 35px;
  transform: translateX(-50%);

  .router-item {
    padding-left: 18px;
  }

  .router-arrow {
    background: url('~@/assets/images/layout/router-left-arrow.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 5px;
  }
  & .router-item:nth-of-type(1) {
    background: url('~@/assets/images/layout/router-left-first-bg.png')
      no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/router-left-first-active-bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }

  & .router-item:nth-of-type(2) {
    background: url('~@/assets/images/layout/router-center-bg.png') no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/router-center-active-bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }

  & .router-item:nth-of-type(3) {
    width: 130px;
    background: url('~@/assets/images/layout/layout(2).png') no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/layout(1).png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
.nav-right {
  position: absolute;
  right: calc(50% - 245px);
  bottom: 35px;
  transform: translateX(50%);

  .router-item {
    padding-left: 18px;

    &:nth-of-type(1) {
      padding-left: 40px;
    }
  }

  .router-arrow {
    background: url('~@/assets/images/layout/router-right-arrow.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 5px;
  }
  & .router-item:nth-of-type(1) {
    width: 130px;
    background: url('~@/assets/images/layout/layout(4).png') no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/layout(3).png') no-repeat;
      background-size: 100% 100%;
    }
  }

  & .router-item:nth-of-type(2) {
    background: url('~@/assets/images/layout/router-center-bg.png') no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/router-center-active-bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }

  & .router-item:nth-of-type(3) {
    background: url('~@/assets/images/layout/router-right-last-bg.png')
      no-repeat;
    background-size: 100% 100%;

    &:hover,
    &.active {
      background: url('~@/assets/images/layout/router-right-last-active-bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
