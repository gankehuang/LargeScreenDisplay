<template>
  <div
    v-if="visible"
    class="modal-container"
    :style="modalPositionObj"
  >
    <img
      class="btn-close"
      src="@/assets/images/common/close-btn.png"
      @click="bindBtnClose"
    >
    <div class="modal-title">
      {{ info.title }}
    </div>
    <!-- <Visual
      v-bind="$attrs"
      style="transform: scale(0.65);position:relative;top:-130px;left:-70px;"
    /> -->
  </div>
</template>

<script>
// import Visual from './Visual/Visual'
export default {
  components: {
    // Visual
  },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    modalPositionObj () {
      if (this.info && this.info.position === 'left') {
        return {
          left: '20px'
        }
      }

      if (this.info && this.info.position === 'right') {
        return {
          right: '20px'
        }
      }
    }
  },
  methods: {
    bindBtnClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-title {
  position: absolute;
  left: 20px;
  top: 10px;
  font-size: 16px;
  color: #3b9afe;
}
.modal-container {
  position: fixed;
  right: 20px;
  bottom: 16px;
  width: 400px;
  height: 570px;
  background: url("~@/assets/images/situation/columnsAnimationModal-bg.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 999999;
  color: #fff;

  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    z-index: 999;

    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
