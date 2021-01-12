<template>
  <div class="iframe-box">
    <iframe
      frameborder="0"
      :src="needUrl ? needUrl : url"
      :width="width"
      :height="height"
      allowfullscreen
      allow="autoplay; fullscreen"
    />
  </div>
</template>

<script>
import { getToken } from '@/api/common/others'
export default {
  props: {
    cameraIndexCode: {
      type: [String, Number],
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    }
  },
  data () {
    return {
      token: '',
      needUrl: ''
    }
  },
  watch: {
    cameraIndexCode: {
      immediate: true,
      handler () {
        this.queryToken()
      }
    }
  },
  methods: {
    queryToken () {
      getToken().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.token = data
          this.needUrl = `http://172.11.16.61:10000/play.html?serial=36010000002002019807&code=${this.cameraIndexCode}&aspect=fullscreen&token=${this.token}`
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
}
</style>
