<template>
  <div
    slot="tool"
    class="device-contaier"
  >
    <div
      class="device-selector"
      @click="switchMenu"
    >
      <span class="title">工具</span>
      <img
        class="arrow"
        :class="menuActive&&'active'"
        src="@/assets/images/commandAndDispatch/layout/右箭头.png"
      >
    </div>
    <transition name="menu">
      <div
        v-if="menuActive"
        class="menu"
      >
        <div
          v-for="menu in menuList"
          :key="menu.name"
          class="item"
          :class="menu.active&&'active'"
          @click="bindToolBtn(menu.type)"
        >
          <img :src="menu.src">
          <div>{{ menu.name }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['selected'],
  data () {
    return {
      menuActive: false,
      menuList: [
        {
          name: '矩形框选',
          src: require('@/assets/images/commandAndDispatch/safe/tool-rect.png'),
          type: 'rectangle'
        },
        {
          name: '圆形框选',
          src: require('@/assets/images/commandAndDispatch/safe/tool-round.png'),
          type: 'circle'
        },
        {
          name: '多边形框选',
          src: require('@/assets/images/commandAndDispatch/safe/tool-polygon.png'),
          type: 'polygon'
        },
        {
          name: '测距',
          src: require('@/assets/images/commandAndDispatch/safe/tool-distance.png'),
          type: 'distance'
        }
      ]
    }
  },
  watch: {
    selected () {
      this.menuList.forEach(menu => {
        if (this.selected.includes(menu.name)) {
          menu.active = true
        } else {
          menu.active = false
        }
      })
    }
  },
  methods: {
    bindToolBtn (type) {
      this.$emit('bindToolBtn', type)
      this.menuActive = false
    },
    switchMenu () {
      this.menuActive = !this.menuActive
    }
  }
}
</script>

<style lang="scss" scoped>
.device-contaier {
    position: absolute;
    top: 70px;
    left: 384px;
    margin-left: 50px;
    z-index: 999;
    user-select: none;
}

.device-selector {
    width: 128px;
    height: 43px;
    background: url("~@/assets/images/commandAndDispatch/组 12 拷贝 11@2x.png");
    background-size: 100% 100%;
    cursor: pointer;
    .title {
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        line-height: 43px;
        padding-left: 24px;
    }
    .arrow {
        display: inline-block;
        margin-left: 40px;
        // .ani();
        &.active {
            transform: rotate(180deg);
        }
    }
}

.menu {
    position: absolute;
    background: rgba(3, 34, 60, 0.9);
    border: 1px solid rgba(11, 97, 160, 1);
    padding: 10px 6px 5px 6px;
    top: 44px;
    left: 10px;
    border-radius: 5px;
    z-index: -1;
    .item {
        width: 68px;
        height: 48px;
        font-size: 12px;
        color: #b2e3fc;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 10px;
        cursor: pointer;
    }
}

.menu-enter-active,
.menu-leave-active {
    transition: all 0.5s;
}

.menu-enter,
.menu-leave-to {
    opacity: 0;
}
</style>
