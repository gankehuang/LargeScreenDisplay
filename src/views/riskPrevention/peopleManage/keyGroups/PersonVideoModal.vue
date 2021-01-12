<template>
  <div
    v-if="visible"
    class="mask-container"
  >
    <div class="mask" />
    <div class="modal">
      <img
        class="btn-close"
        src="@/assets/images/common/close-btn.png"
        @click="bindBtnClose"
      >
      <div class="player-container">
        <IframeVideoPlay
          v-if="info.gbIndexCode || info.cameraIndexCode"
          :camera-index-code="
            info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
          "
          width="100%"
          height="408"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    visible: Boolean
  },
  data () {
    return {}
  },
  methods: {
    bindBtnClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/images/keyGroups/modal-bg1.png") no-repeat;
  background-size: contain;
  width: 700px; /*播放容器的宽和高设定*/
  height: 490px;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 12px 7px 6px 6px;

  .btn-close {
    position: absolute;
    top: 12px;
    right: 27px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
    }
  }

  .player-container {
    margin-top: 20px;
    width: 100%;
    height: 428px;
    padding: 10px;
  }

  .video-box {
    padding: 10px;
    height: 476px;
    border: 1px solid #0b61a0;

    .header {
      position: relative;

      .controll-icon {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }

      .bayonet-name {
        color: #00a0e9;
        padding-left: 10px;
        font-size: 12px;
      }

      .toggle-icon {
        position: absolute;
        right: 10px;
        top: 2px;
        width: 14px;
        height: 14px;
        cursor: pointer;
      }

      .toggle-list {
        position: absolute;
        z-index: 99;
        right: 18px;
        top: 30px;
        color: #fff;
        .toggle-item {
          font-size: 12px;
          background: rgba(3, 34, 60, 0.8);
          border-radius: 3px;
          margin-top: 10px;
          padding: 6px;
          cursor: pointer;

          &.active {
            color: #00a0e9;
          }
        }
      }
    }
  }
}
</style>
