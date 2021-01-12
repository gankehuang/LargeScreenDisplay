<template>
  <video
    ref="player"
    class="container"
    autoplay
    controls
    controlslist="noremoteplayback"
    preload
  />
</template>

<script>
import flvjs from 'flv.js'
import { stopVideo, newStopVideo } from '@/api/smartData/gridView'
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    isNew: {
      type: Boolean,
      default: false
    },
    hasAudio: {
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
    if (this.id) {
      this.playerStop()
    }
  },
  methods: {
    playStart () {
      if (this.id) {
        localStorage.setItem('flvVideoId', this.id)
      }
      this.player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: this.src,
        hasAudio: this.hasAudio,
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
      localStorage.removeItem('flvVideoId')
      if (this.isNew) {
        newStopVideo({
          id: this.id
        }).then(res => {})
      } else {
        stopVideo({
          id: this.id
        }).then(res => {})
      }
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
