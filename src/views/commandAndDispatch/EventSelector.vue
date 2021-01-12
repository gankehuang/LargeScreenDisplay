<template>
  <div
    slot="tool"
    class="device-contaier"
  >
    <div
      class="device-selector"
      @click="switchMenu"
    >
      <span class="title">感知事件</span>
      <img
        class="arrow"
        :class="menuActive && 'active'"
        src="@/assets/images/commandAndDispatch/layout/select-arrow.png"
      >
    </div>
    <transition name="menu">
      <div
        v-if="menuActive"
        class="menu"
      >
        <div
          class="item"
          :class="isSelectedAll && 'active'"
          @click="selectAll"
        >
          <img src="~@/assets/images/commandAndDispatch/layout/all.png">
          <div>全部</div>
        </div>
        <div
          v-for="menu in menuList"
          :key="menu.name"
          class="item"
          :class="menu.active && 'active'"
          @click="selectMenu(menu.name)"
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
      menuActive: true,
      menuList: [
        {
          name: '设备感知',
          src: require('@/assets/images/commandAndDispatch/event/sbgz.png'),
          active: false
        },
        {
          name: '群众上报',
          src: require('@/assets/images/commandAndDispatch/event/zdry.png'),
          active: false
        },
        {
          name: '督办协办',
          src: require('@/assets/images/commandAndDispatch/event/txgz.png'),
          active: false
        },
        {
          name: '主动发现',
          src: require('@/assets/images/commandAndDispatch/event/zdsb.png'),
          active: false
        }
      ]
    }
  },
  computed: {
    isSelectedAll () {
      return this.menuList.every(menu => menu.active)
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
    selectMenu (menuName) {
      this.menuList.find(menu => {
        if (menu.name === menuName) {
          menu.active = !menu.active
          return true
        }
      })
      this.update()
    },
    selectAll () {
      if (this.isSelectedAll) {
        this.menuList.forEach(menu => (menu.active = false))
      } else {
        this.menuList.forEach(menu => (menu.active = true))
      }
      this.update()
    },
    update () {
      const selected = this.menuList.reduce((acc, cur) => {
        if (cur.active) {
          acc.push(cur.name)
        }
        return acc
      }, [])
      this.$emit('update:selected', selected)
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
    left: 430px;
    z-index: 5;
    user-select: none;
}

.device-selector {
    width: 128px;
    height: 43px;
    background: url("~@/assets/images/commandAndDispatch/layout/select-item.png");
    background-size: 100% 100%;
    cursor: pointer;
    &:hover {
        background: url('~@/assets/images/commandAndDispatch/layout/link-btn-last_active.png');
    }
    .title {
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        line-height: 43px;
        padding-left: 24px;
    }
    .arrow {
        display: inline-block;
        margin-left: 9px;
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
        &.active {
            background: url('~@/assets/images/commandAndDispatch/layout/selected-bg.png') no-repeat;
        }
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
