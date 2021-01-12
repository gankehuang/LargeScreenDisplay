<template>
  <div class="tabs-box">
    <div
      v-for="(item, index) in navList"
      :key="index + 'item'"
      class="tabs-item"
      :class="{active: curIndex === index }"
      @click.stop="handleItem(item, index)"
    >
      {{ item.name }}
      <i
        v-if="curIndex === index"
        class="item-arrow"
      />
      <div
        v-if="isOpenChildMenu && item.children && item.children.length > 0"
        v-clickoutside="handleClose"
        class="childList-box"
      >
        <div
          v-for="(childItem, childIndex) in item.children"
          :key="childIndex + 'child'"
          class="child-item"
          :class="{'child-item-active': childItem.name === curChildName }"
          @click.stop="handleItemChild(childItem, childIndex)"
        >
          {{ childItem.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      required: true,
      type: Array
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      curIndex: -1,
      curChildName: '',
      isOpenChildMenu: false
    }
  },
  created () {
    this.curIndex = this.activeIndex
  },
  methods: {
    handleItem (item, index) {
      if (this.curIndex !== index) { // 说明切换其他item
        sessionStorage.removeItem('curChildName')
        this.isOpenChildMenu = false
        this._switchPage(item)
      }

      // 有子菜单，则切换菜单框
      if (item.children && item.children.length) {
        this.isOpenChildMenu = !this.isOpenChildMenu
        this.curChildName = sessionStorage.getItem('curChildName')
          ? sessionStorage.getItem('curChildName') : ''
      }

      this.curIndex = index
    },
    handleItemChild (childItem) {
      this._switchPage(childItem)
      sessionStorage.setItem('curChildName', childItem.name)
      this.curChildName = childItem.name
    },
    _switchPage (item) {
      if (!item.url) {
        return
      }
      if (item.url.indexOf('http') === -1) {
        this.$router.push(item.url)
      } else {
        window.open(item.url, '_blank')
      }
    },
    handleClose () {
      this.isOpenChildMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-box {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 65px;
  z-index: 998;
  height: 40px;
  line-height: 35px;
  display: flex;
  background: url('~@/assets/images/common/nav-tabs-bg.png') no-repeat;
  background-size: 100% 100%;
  .tabs-item {
    position: relative;
    color: #BEE4FF;
    font-size: 18px;
    padding: 0 15px;
    cursor: pointer;
    font-weight: normal;
    &:nth-of-type(1) {
      margin-left: 0;
    }
    &.active {
      font-weight: 550;
      .item-arrow {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 10px;
        height: 9px;
        transform: translateX(-50%);
        background: url('~@/assets/images/common/nav-tabs-item-active-bg.png') no-repeat;
        font-weight: 550;
      }
    }
  }
  .childList-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    width: 100px;
    background-color: #00327D;
    padding: 6px 0;
    border-radius: 4px;
    border: 1px solid #2FA4FF;
    .child-item {
      text-align: center;
      padding: 3px 10px;
      font-weight: normal;
      &.child-item-active {
        background-color: #004A9E;
      }
    }
  }
}
</style>
