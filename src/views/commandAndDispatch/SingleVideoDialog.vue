<template>
  <div
    v-if="oneModelStatus"
    class="model-one-box"
    :style="{ 'width': width }"
  >
    <span
      class="close"
      @click="closeOneModel"
    >X</span>
    <div class="title">
      <img src="@/assets/images/commandAndDispatch/摄像头.png">
      <span>{{ title }}</span>
    </div>
    <!-- <IframeVideoPlay :camera-index-code="moreVideoList[1].cameraIndexCode" /> -->
    <!-- <IframeVideoPlay :url="require('@/assets/videos/12.mp4')" /> -->
    <video
      class="video-box"
      width="100%"
      autoplay
      loop
      :src="src"
    />
  </div>
</template>

<script>
export default {
  props: {
    oneModelStatus: {
      type: [Boolean],
      default: () => false
    },
    width: {
      type: [String],
      default: '30%'
    },
    src: {
      type: [String],
      default: require('@/assets/videos/12.mp4')
    },
    title: {
      type: [String],
      default: '生米868南昌杉杉奥特莱斯内东南侧支路'
    }
  },
  data () {
    return {

    }
  },

  mounted () {

  },
  methods: {
    closeOneModel () {
      this.$emit('closeOneModel')
    }
  }
}
</script>

<style lang="scss" scoped>
.model-one-box {
  position: absolute;
  left: 35%;
  top: 30%;
  height: auto;
  padding: 15px;
  z-index: 999;
  background: url("~@/assets/images/commandAndDispatch/视频框@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .video-box {
    margin-top: 20px;
  }
  .title {
    position: absolute;
    top: 10px;
    left: 20px;
    img {
      width: 18px;
      height: 16px;
      vertical-align: top;
    }
    span {
      color: #ffffff;
    }
  }
  .close {
    position: absolute;
    right: 2%;
    top: 5px;
    color: #00A2FF;
    cursor: pointer;
  }
}
</style>
