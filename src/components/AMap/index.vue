<template>
  <div class="map">
    <el-amap
      :center="center"
      :events="mapEvents"
      :zooms="[3, 20]"
      :rotate-enable="false"
      :pitch-enable="true"
      :expand-zoom-range="true"
      :pitch="50"
      :building-animation="true"
      view-mode="2D"
    >
      <slot />
    </el-amap>

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
import { queryGridThreeLine, getGridLine } from '@/api/common/grid'
export default {
  props: {
    distanceRight: {
      type: Number,
      default: 458
    },
    viewMode: {
      type: String,
      default: '3D'
    }
  },
  data () {
    return {
      gridDetailsModal: {
        visible: false,
        info: null
      },
      center: [113.868711, 27.62303],
      zoom: 10,
      map: null,
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
        },
        complete: () => {
          this.$emit('complete')
        },
        mousewheel: event => {
          this.$emit('mousewheel', event)
        }
      },
      polygons: [],
      firstPolygons: [], // 存储第一层图层数据
      textList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map.setZoom(12)
      this.renderGrid()
    })
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
    // 随机颜色
    randomColor () {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    resetGrid () {
      this.map.remove(this.polygons)
      this.map.remove(this.textList)
      this.polygons = []
      this.textList = []
    },
    // 初始化图层
    async renderGrid () {
      this.resetGrid()

      let gridArr = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
        this.gridList = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this.randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })
        this.polygons.push(ploygon)
        this.firstPolygons.push(ploygon)

        ploygon.on('click', event => {
          const { target } = event
          this.$EventBus.$emit('update:curGrid', target.w.extData)
          this.renderGrid1(target.w.extData.code, target.w.extData.gridLevel)
        })

        ploygon.on('rightclick', event => {
          const { target } = event
          setTimeout(() => {
            this.gridDetailsModal.visible = true
            this.gridDetailsModal.info = {
              code: target.w.extData.code,
              path: target.w.extData.path,
              gridLevel: target.w.extData.gridLevel
            }
          }, 100)
        })

        ploygon.on('mouseover', () => {
          ploygon.setOptions({
            fillColor: 'yellow',
            fillOpacity: 0.25
          })
        })

        ploygon.on('mouseout', () => {
          ploygon.setOptions({
            fillColor: ploygon.w.fillColor,
            fillOpacity: 0.3
          })
        })

        if (item.gridLevel === 3) {
          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }
      })
      this.map.add(this.polygons)
      this.map.add(this.textList)
      this.map.setFitView(this.polygons)
    },
    // 第二图层以下图层渲染
    async renderGrid1 (code, gridLevel) {
      this.resetGrid()
      let gridArr = []
      const { status, data } = await getGridLine({
        code: code,
        gridLevel: gridLevel
      })
      if (status === 200) {
        gridArr = data
        this.gridList = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this.randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })
        this.polygons.push(ploygon)

        if (item.gridLevel < 6) {
          ploygon.on('click', event => {
            const { target } = event
            this.$EventBus.$emit('update:regionInfo', target.w.extData)
            if (target.w.extData.gridLevel < 6) {
              this.renderGrid1(
                target.w.extData.code,
                target.w.extData.gridLevel
              )
            }
          })
        }

        ploygon.on('rightclick', event => {
          setTimeout(() => {
            const { target } = event
            this.gridDetailsModal.visible = true
            this.gridDetailsModal.info = {
              code: target.w.extData.code,
              path: target.w.extData.path,
              gridLevel: target.w.extData.gridLevel
            }
          }, 100)
        })

        ploygon.on('mouseover', () => {
          ploygon.setOptions({
            fillColor: 'yellow',
            fillOpacity: 0.25
          })
        })

        ploygon.on('mouseout', () => {
          ploygon.setOptions({
            fillColor: ploygon.w.fillColor,
            fillOpacity: 0.3
          })
        })

        if (item.gridLevel <= 5) {
          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }

        if (item.gridLevel === 6) {
          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }
      })

      this.map.add(this.polygons)
      this.map.add(this.textList)
      this.map.setFitView(this.polygons)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
