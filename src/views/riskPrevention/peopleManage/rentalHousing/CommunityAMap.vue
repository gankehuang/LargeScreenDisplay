<template>
  <div class="map">
    <el-amap
      vid="amapDemo"
      :center="center"
      :events="events"
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

    <slot name="tool" />

    <div
      class="map-reset"
      :style="{ right: distanceRight + 'px' }"
      @click="reset"
    >
      <img src="@/assets/images/map/map-reset.png">
    </div>

    <div
      class="map-zoom"
      :style="{ right: distanceRight + 'px' }"
    >
      <div
        class="zoom"
        @click="zoomIn"
      >
        <img src="@/assets/images/map/zoomIn.png">
      </div>
      <div class="division" />
      <div
        class="zoom"
        @click="zoomOut"
      >
        <img src="@/assets/images/map/zoomOut.png">
      </div>
    </div>
  </div>
</template>

<script>
import '@/plugins/amap'
import {
  getCommunityList,
  selectByRegion
} from '@/api/riskPrevention/peopleManage/rentalHousing'
export default {
  props: {
    distanceRight: {
      type: Number,
      default: 458
    },
    viewMode: {
      type: String,
      default: '2D'
    }
  },
  data () {
    return {
      center: [115.791124, 28.611357],
      zoom: 13,
      map: null,
      events: {
        init: map => {
          this.map = map
          this.zoom = map.getZoom()
          // map.setDefaultCursor("crosshair")
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          this.renderMarkerList()
          this.addLayers()
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
  },
  methods: {
    reset () {
      if (this.layers.length) {
        this.map.setFitView(this.layers)
      } else {
        this.map.setCenter(this.center)
      }
    },
    zoomIn () {
      this.map.zoomIn()
    },
    zoomOut () {
      this.map.zoomOut()
    },
    // 渲染小区坐标图层
    addLayers () {
      selectByRegion().then(res => {
        const list = res.data
        const ploygonList = []
        list.forEach(item => {
          if (item.communityBoundary) {
            const communityBoundaryList = []
            item.communityBoundary.split(';').forEach(item1 => {
              if (item1.indexOf(',') > -1) {
                communityBoundaryList.push(item1.split(','))
              }
            })

            const ploygon = new AMap.Polygon({
              path: communityBoundaryList,
              strokeColor: 'yellow',
              fillOpacity: 0.3,
              fillColor: '#6367a1',
              strokeStyle: 'solid',
              strokeWeight: 2,
              extData: {}
            })

            ploygonList.push(ploygon)
          }
        })
        this.map.add(ploygonList)
        this.map.setFitView(ploygonList)
      })
    },
    // 渲染小区标记点
    renderMarkerList () {
      getCommunityList().then(res => {
        const communityMarker = []
        const communityList = res.data.list.filter(
          item => item.longitude && item.latitude
        )

        if (communityList.length && this.map) {
          const communityNameList = []
          AMapUI.load(['ui/overlay/SimpleMarker'], SimpleMarker => {
            communityList.forEach((community, index) => {
              const firstWord = community.communityName.slice(0, 1)
              const secondWord = community.communityName.slice(1, 2)
              const needWord = communityNameList.includes(firstWord)
                ? secondWord
                : firstWord

              const marker = new SimpleMarker({
                iconLabel: {
                  innerHTML: needWord,
                  style: {
                    color: '#fff',
                    fontSize: '120%',
                    marginTop: '2px'
                  }
                },
                title: community.communityName,
                iconStyle: 'red',
                map: this.map,
                position: [community.longitude, community.latitude]
              })

              communityNameList.push(needWord)

              communityMarker.push(marker)

              marker.on('click', () => {
                this.map.setZoom(18)
                this.map.setCenter([community.longitude, community.latitude])
                if (!community.vrUrl) {
                  this.$emit('bindMarker', community)
                } else {
                  this.$emit('showVR', community)
                }
              })
            })

            this.map.add(communityMarker)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
