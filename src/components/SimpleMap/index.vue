<template>
  <div class="map">
    <el-amap
      :events="mapEvents"
      :zooms="[3, 20]"
      :rotate-enable="false"
      :pitch-enable="true"
      :expand-zoom-range="true"
      :pitch="50"
      :building-animation="true"
      :view-mode="viewMode"
    >
      <slot />
    </el-amap>
  </div>
</template>

<script>
import '@/plugins/amap'

export default {
  props: {
    viewMode: {
      type: String,
      default: '2D'
    }
  },
  data () {
    return {
      zoom: 13,
      map: null,
      center: [113.868711, 27.62303],
      mapEvents: {
        init: map => {
          this.map = map
          this.zoom = map.getZoom()
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          this.$emit('mapInit', map, this.zoom)
        },
        click: e => {
          console.log([e.lnglat.lng, e.lnglat.lat].toString())
        },
        zoomchange: () => {
          this.zoom = this.map.getZoom()
          this.$emit('zoomChange', this.zoom)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
