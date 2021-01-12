<template>
  <transition
    name="ani-right"
    mode="out-in"
    appear
  >
    <div
      class="modal"
      :style="{ background: 'url(' + alertBg + ')' }"
    >
      <div class="title">
        事件提醒
      </div>
      <img
        class="btn-close"
        src="@/assets/images/common/close-btn.png"
        @click="bindBtnClose"
      >
      <div class="event-img">
        <el-image
          :z-index="999"
          style="width:80px;height:80px;"
          :preview-src-list="[
            alertInfo.snapBakUrl
              ? alertInfo.snapBakUrl
              : alertInfo.originImageUrl
                ? alertInfo.originImageUrl
                : require('@/assets/images/common/no-avatar.png')
          ]"
          :src="
            alertInfo.snapImageUrl
              ? alertInfo.snapImageUrl
              : alertInfo.originImageUrl
                ? alertInfo.originImageUrl
                : require('@/assets/images/common/no-avatar.png')
          "
        />
      </div>

      <div class="body">
        <p>
          <span>事件名称：</span>
          {{ alertInfo.eventName }}
        </p>
        <p>
          <span>发生时间：</span>
          {{ alertInfo.happenedTime }}
        </p>
        <p class="position">
          <span>发生地：</span>
          <span class="position-value">{{ alertInfo.location }}</span>
        </p>
        <p>
          <span>事件级别：</span>
          <span
            class="label"
            :style="{ background: btnColor }"
          >{{
            alertInfo.emergencyLevelText
          }}</span>
        </p>
        <span
          class="look-btn"
          :style="{ color: btnColor }"
          @click="bindShowDetail"
        >查看详情</span>
        <audio
          ref="audio"
          :src="warningAudio"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import warningAudio from '@/assets/voice/warning.mp3'

export default {
  filters: {
    statusFilter (value) {
      switch (value) {
        case 0:
          return '无效'
        case 1:
          return '未处理'
        case 2:
          return '处置中'
        case 3:
          return '已完成'
        case 4:
          return '超时'
        case 5:
          return '催单'
        default:
          return ''
      }
    }
  },
  props: {
    alertInfo: {
      required: true,
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      warningAudio
    }
  },
  computed: {
    alertBg: function () {
      if (this.alertInfo.emergencyLevel === '1') {
        return require('./alert-bg1.png')
      } else if (this.alertInfo.emergencyLevel === '2') {
        return require('./alert-bg2.png')
      } else if (this.alertInfo.emergencyLevel === '3') {
        return require('./alert-bg3.png')
      } else if (this.alertInfo.emergencyLevel === '4') {
        return require('./alert-bg4.png')
      } else {
        return require('./alert-bg4.png')
      }
    },
    btnColor: function () {
      if (this.alertInfo.emergencyLevel === '1') {
        return '#FD2B34'
      } else if (this.alertInfo.emergencyLevel === '2') {
        return '#AB4F11'
      } else if (this.alertInfo.emergencyLevel === '3') {
        return '#B48C4B'
      } else if (this.alertInfo.emergencyLevel === '4') {
        return '#19843A'
      } else {
        return '#19843A'
      }
    }
  },
  mounted () {
    this.$refs.audio.play()
  },
  methods: {
    bindBtnClose () {
      this.$emit('bindBtnClose')
    },
    bindShowDetail () {
      this.$emit('bindShowDetail', this.alertInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 380px;
  height: 228px;
  position: fixed;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  .title {
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding-left: 24px;
  }
  .btn-close {
    position: absolute;
    top: 14px;
    right: 24px;
    cursor: pointer;
  }
  .event-img {
    position: absolute;
    right: 20px;
    top: 60px;
    width: 80px;
    height: 80px;

    &::v-deep .el-icon-circle-close {
      color: #fff;
    }

    &::v-deep .el-image-viewer__close {
      position: fixed !important;
    }
  }

  .body {
    height: calc(100% - 50px);
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 10px;
    p {
      color: #ffffff;
      font-size: 14px;
      margin: 8px 0;
      span:nth-of-type(1) {
        width: 70px;
        text-align: right;
        display: inline-block;
      }
      .label {
        padding: 1px 8px;
        border-radius: 8px;
      }
    }

    .position {
      display: flex;
      .position-value {
        flex: 0 0 142px;
      }
    }

    .look-btn {
      position: absolute;
      bottom: 32px;
      right: 20px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
