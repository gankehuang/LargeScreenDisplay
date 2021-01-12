<template>
  <InfoBlock
    title="实时视频"
    height="362px"
  >
    <div class="videos">
      <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOption"
        />
      </div>
      <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOption1"
        />
      </div>
      <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOption2"
        />
      </div>
      <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOption3"
        />
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      loading: false,
      player: null,
      playerOption: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: require('@/assets/videos/1.mp4') // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false
      },
      playerOption1: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: require('@/assets/videos/8.mp4') // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false
      },
      playerOption2: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: require('@/assets/videos/21.mp4') // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false
      },
      playerOption3: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: require('@/assets/videos/5.mp4') // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false
      }
    }
  },
  watch: {
    mute () {
      this.player.muted(this.mute)
    }
  },
  mounted () {
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    handlerCilck () {
      this.$emit('handlerCilck')
    },
    onPlayerWaiting () {
      this.loading = true
    },
    onPlayerLoadeddata () {
      this.loading = false
    },
    displayFullScreen () {
      this.player.requestFullscreen()
      this.fullScreen = true
    }
  }
}
</script>

<style lang="scss" scoped>
.videos {
  // padding: 18px 22px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .video {
    width: 192px;
    height: 140px;
    margin-top: 10px;
    line-height: 64px;
    background: #001E41;
    overflow: hidden;
    ::v-deep video {
            width: 192px;
            // height: 140px;
          }
    ::v-deep .vjs-fluid {
            padding-top: 10px!important;
    }
  }
}
</style>
