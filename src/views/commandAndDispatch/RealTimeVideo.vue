<template>
  <InfoBlock
    title="实时视频"
    height="46%"
  >
    <div
      v-for="(item, index) in realTimeVideo"
      :key="index"
      class="video-box"
      @dblclick="showVideo(item.id)"
    >
      <!-- <IframeVideoPlay :camera-index-code="item.cameraIndexCode" /> -->
      <video
        width="185px"
        autoplay
        loop
        :src="require(`@/assets/videos/${item.id}.mp4`)"
      />
      <!-- <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player"
          :playsinline="true"
          :options="item.option"
        />
      </div> -->
    </div>
  </InfoBlock>
</template>

<script>
// import { videoPlayer } from 'vue-video-player'
export default {
  // components: { videoPlayer },
  data () {
    return {
      url: require('@/assets/videos/1.mp4'),
      realTimeVideo: [
        {
          id: 3,
          cameraIndexCode: '36012120001320000099',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                type: 'video/mp4', // 类型
                src: require('@/assets/videos/3.mp4') // url地址
              }
            ],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: false
          }
        },
        {
          id: 4,
          cameraIndexCode: '36015602001320001610',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                type: 'video/mp4', // 类型
                src: require('@/assets/videos/4.mp4') // url地址
              }
            ],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: false
          }
        },
        {
          id: 5,
          cameraIndexCode: '36015602001320001774',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
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
        },
        {
          id: 6,
          cameraIndexCode: '36012102001310993251',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                type: 'video/mp4', // 类型
                src: require('@/assets/videos/6.mp4') // url地址
              }
            ],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: false
          }
        },
        {
          id: 7,
          cameraIndexCode: '36012102001310993251',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                type: 'video/mp4', // 类型
                src: require('@/assets/videos/7.mp4') // url地址
              }
            ],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: false
          }
        },
        {
          id: 8,
          cameraIndexCode: '36012102001310993251',
          positionName: '',
          option: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: true, // 如果为true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: true, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
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
          }
        }
      ]
    }
  },

  mounted () {

  },
  methods: {
    async showVideo (id) {
      console.log(id)
      this.$emit('showVideo', id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .video-box {
    padding: 8px;
    display: inline-block;
    width: 50%;
    height: 116px;

    .video {
      width: 185px;
      height: 105px;
      line-height: 64px;
      background: #001E41;
      overflow: hidden;
      ::v-deep video {
        width: 185px;
        // height: 90px;
      }
      ::v-deep .vjs-fluid {
        padding-top: 0px!important;
      }
    }
  }
</style>
