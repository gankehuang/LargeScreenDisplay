<template>
  <div v-if="visible">
    <div class="mask" />
    <div class="vr-modal">
      <img
        class="btn-close"
        src="@/assets/images/common/close-btn.png"
        @click="bindBtnClose"
      >

      <iframe
        id="vrIframe"
        :src="info.vrUrl"
        width="100%"
        height="100%"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    info: {
      type: Object,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  watch: {
    visible () {
      console.log(this.info.vrUrl)
    }
  },
  mounted () {

  },
  methods: {
    bindBtnClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
    .vr-modal {
        position: absolute;
        box-sizing: border-box;
        background: url('~@/assets/images/rentalHousing/z-data-bg.png')no-repeat center;
        background-size: 100% 100%;
        width: 1600px;
        height: 800px;
        top: 50%;
        left: 50%;
        z-index: 9999999999;
        transform: translate(-50%, -50%);

        .btn-close {
            position: absolute;
            top: 23px;
            right: 27px;
            cursor: pointer;
            &:hover {
                filter: brightness(1.2);
            }
        }
    }
</style>
