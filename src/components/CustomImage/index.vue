<template>
  <el-image
    :class="{ 'image-blur': isBlurImage }"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import { isBlurImage } from '@/config/common'
export default {
  data () {
    return {}
  },
  computed: {
    isBlurImage () {
      return isBlurImage
    }
  }
}
</script>

<style>
.image-blur {
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
}
</style>
