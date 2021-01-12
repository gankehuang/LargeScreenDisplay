<template>
  <div
    v-if="visible"
    class="my-modal"
    :style="{ 'z-index': getZIndex() }"
  >
    <div
      class="modal-mark"
      :style="{ 'z-index': getZIndex() + 1 }"
      @click.self="closeMyself"
    />
    <transition name="ani-popup">
      <div
        class="modal-container"
        :style="containerStyle"
      >
        <div class="modal-header">
          <div class="modal-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <img
            class="modal-close"
            src="@/assets/images/common/close-btn.png"
            @click="closeModal"
          >
        </div>

        <div class="modal-content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: [String, Number],
      default: 0
    },
    left: {
      type: [String, Number],
      default: 0
    },
    width: {
      type: [String, Number],
      default: '1200px'
    },
    height: {
      type: [String, Number],
      default: '800px'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '默认标题'
    }
  },
  data () {
    return {
      bodyOverflow: ''
    }
  },
  computed: {
    containerStyle () {
      const containerStyle = {
        zIndex: this.getZIndex() + 2
      }
      typeof this.top === 'number'
        ? (containerStyle.top = this.top + 'px')
        : (containerStyle.top = this.top)
      typeof this.left === 'number'
        ? (containerStyle.left = this.left + 'px')
        : (containerStyle.left = this.left)
      typeof this.width === 'number'
        ? (containerStyle.width = this.width + 'px')
        : (containerStyle.width = this.width)
      typeof this.height === 'number'
        ? (containerStyle.height = this.height + 'px')
        : (containerStyle.height = this.height)
      return containerStyle
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.closeMyself()
        this.$emit('close')
      } else {
        this.$emit('open')
      }
    }
  },
  mounted () {
    this.forbidScroll()
  },
  methods: {
    closeModal () {
      this.$emit('update:visible', false)
    },
    getZIndex () {
      let zIndexInit = 9999
      return zIndexInit++
    },
    // 点击遮罩关闭弹窗
    closeMyself (event) {
      this.sloveBodyOverflow()
    },
    // 禁止页面滚动
    forbidScroll () {
      this.bodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    },
    // 恢复页面的滚动
    sloveBodyOverflow () {
      document.body.style.overflow = this.bodyOverflow
    }
  }
}
</script>

<style lang="scss" scoped>
.my-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  .modal-mark {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
}

.modal-header {
  position: relative;
  width: 100%;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background: url("~@/assets/images/common/dialog-head-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .modal-title {
    color: #EDF4FF;
    font-size: 24px;
  }
  .modal-close {
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 24px;
  }
}

.modal-container {
  background: url("~@/assets/images/common/dialog-bg.png") no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .modal-content {
    position: relative;
    padding: 20px;
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
