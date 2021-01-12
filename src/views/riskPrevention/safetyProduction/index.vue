<!-- 风险防范 安全生产 -->
<template>
  <div class="page-container">
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-for="item in eventList"
        :key="item.id"
        :position="[item.longitude, item.latitude]"
        :vid="item.id"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker :event-type="item.eventName" />
      </el-amap-marker>
    </SimpleMap>
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <LeftModal />
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <RightModal :event-list="eventList" />
    </transition>

    <Dialog
      width="1200px"
      height="700px"
      :visible.sync="dialogVisible"
    />

    <NavTabs
      :nav-list="navTabsList"
      :active-index="4"
    />
  </div>
</template>
<script>

import navTabsMixin from '../mixin/navTabsMixin'
import { getEventArr } from '@/api/common/event'
import { queryGridThreeLine } from '@/api/common/grid'

// 局部组件引入
import LeftModal from './leftModal/leftModal'
import RightModal from './rightModal/rightModal'

export default {
  components: {
    LeftModal,
    RightModal
  },
  mixins: [navTabsMixin],
  data () {
    return {
      dialogVisible: false,
      eventInfo: null,
      eventList: []
    }
  },
  created () {
    this.getAllEventList()
  },
  mounted () {
    // this.$EventBus.$on('focusEvent', item => {
    //   // 聚焦当前点击事件
    //   if (item.position.length && item.position[0] && item.position[1]) {
    //     this.eventInfo = item
    //     this.map.setCenter([item.longitude, item.latitude])
    //     this.map.setZoom(32)
    //   } else {
    //     this.$message.warning('未获取到该事件的位置信息')
    //   }
    // })
    this.$EventBus.$on('safeProduceEvent', item => {
      this.eventInfo = item
      this._focusMap(item.position, 16)
      // this.showEventDetail(item)
    })
  },
  methods: {
    // 随机颜色
    randomColor () {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    // 初始化图层
    async renderGrid () {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
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

        polygons.push(ploygon)
      })

      this.map.add(polygons)
    },
    mapInit (map) {
      this.map = map
      this._focusMap([113.88337, 27.676167], 13)
      // this.renderGrid()
    },
    // 聚焦地图
    _focusMap (pos, zoom) {
      this.map.setCenter(pos)
      this.map.setZoom(zoom)
    },
    // 获取全部事件
    async getAllEventList () {
      const { data } = await getEventArr({
        eventCodeList: 'safe_produce'
      })
      this.eventList = data.filter((item, index) => {
        item.isShow = true
        this.eventInfo = item
        return item.longitude && item.latitude
      })

      this.eventList = this.eventList.slice(0, 50)
    }

  }
}
</script>
<style lang="scss" scoped>
  .point-style-box {
    height: 43px;
    width: 134px;
    display: flex;
    align-items: center;

    .p-bg {
      display: flex;
      align-items: center;
      width: 200px;
      height: 20px;
      background: url('~@/assets/images/safetyProduction/p-bg.png') no-repeat;
      background-size: 100% 100%;

      p {
        margin: 0;
        height: 14px;
        color: #ffffff;

      }
    }

  }
</style>
