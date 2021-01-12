<template>
  <div class="container">
    <video
      ref="player"
      class="container"
      autoplay
      controls
      controlslist="noremoteplayback"
      preload
    />
  </div>
</template>

<script>
import flvjs from 'flv.js'
import { stopVideo } from '@/api/perception'
import { newStopVideo } from '@/api/composite/composite'
export default {
  props: {
    src: String,
    id: String,
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      player: null
    }
  },
  mounted () {
    this.playStart()
  },
  destroyed () {
    this.playerStop()
  },
  methods: {
    playStart () {
      this.player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: this.src,
        hasAudio: false,
        hasVideo: true,
        enableWorker: true,
        enableStashBuffer: false,
        stashInitialSize: 128,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range'
      })
      this.player.attachMediaElement(this.$refs.player)
      this.player.load()
      this.player.play()
    },
    playerStop () {
      this.player && this.player.destroy()

      if (this.isNew) {
        newStopVideo({
          id: this.id
        }).then(res => {

        })
      } else {
        stopVideo({
          id: this.id
        }).then(res => {

        })
      }
    }
  }
}
</script>
