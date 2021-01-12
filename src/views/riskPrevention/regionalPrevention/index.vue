<template>
  <div class="page-container">
    <NavTabs
      :nav-list="navTabsList"
      :active-index="1"
    />

    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          :event-type="eventInfo.typeText"
          @markerClick="showEventDetail(eventInfo)"
        />
      </el-amap-marker>

      <el-amap-marker
        v-for="item in shzaList"
        :key="item.id + 'z'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          event-type="社会治安"
          @markerClick="showEventDetail(item)"
        />
      </el-amap-marker>

      <el-amap-marker
        v-for="item in mdjfList"
        :key="item.id + 'q'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          event-type="矛盾纠纷"
          @markerClick="showEventDetail(item)"
        />
      </el-amap-marker>

      <el-amap-marker
        v-for="item in ggaqList"
        :key="item.id + 'd'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          event-type="公共安全"
          @markerClick="showEventDetail(item)"
        />
      </el-amap-marker>

      <el-amap-marker
        v-for="item in wlyqList"
        :key="item.id + 'd'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <EventMarker
          event-type="网络安全"
          @markerClick="showEventDetail(item)"
        />
      </el-amap-marker>
    </SimpleMap>
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <EventType
          @changeRegion="changeRegion"
        />
        <ImportPlace
          @changeIcon="changeIcon"
        />
        <TrendAnalysis />
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <WatchInfo />
        <EventAnalysis />
        <EventInfo
          @focusEvent="focusEvent"
          @todetails="todetails"
        />
      </div>
    </transition>

    <!--事件信息弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="
        modal = '';
        eventInfo = null;
      "
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      :grid-code="gridCode"
      :people-label="peopleLabel"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="modal = 'event'"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = 'event'"
    />
  </div>
</template>
<script>
import navTabsMixin from '../mixin/navTabsMixin'
import eventMixin from './evenModule/eventMixin'

import EventInfo from './EventInfo'
import EventAnalysis from './EventAnalysis'
import EventType from './EventType'
import ImportPlace from './ImportPlace'
import TrendAnalysis from './TrendAnalysis'
import WatchInfo from './WatchInfo'
import { queryGridThreeLine } from '@/api/common/grid'
import { queryLocationList } from '@/api/riskPrevention/regionalPrevention'
import {
  createMapMarkerList
} from '@/common/createMapMarker'
export default {
  components: {
    EventInfo,
    EventType,
    ImportPlace,
    WatchInfo,
    EventAnalysis,
    TrendAnalysis
  },
  mixins: [navTabsMixin, eventMixin],
  data () {
    return {
      dialogVisible: false,
      map: null,
      markList: {
        hospitalList: [],
        buildingList: [],
        getGasStationList: [],
        schoolList: [],
        bridgeList: [],
        gasStationList: []
      }
    }
  },
  created () {
    this.getMarkerList()
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
    async getMarkerList () {
      // 医院
      await queryLocationList({ locationType: '05' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.hospitalList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-hospital.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
      // 学校
      await queryLocationList({ locationType: '08' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.schoolList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-school.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
      // 加油站
      await queryLocationList({ locationType: '11' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.getGasStationList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-getGasStation.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
      // 燃气站
      await queryLocationList({ locationType: '04' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.gasStationList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-gasStation.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
      // 建筑工地
      await queryLocationList({ locationType: '25' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.buildingList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-building.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
      // 过江大桥
      await queryLocationList({ locationType: '26' }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.bridgeList = createMapMarkerList(
            this.map,
            data,
            function (item) {
              return {
                icon: require('@/assets/images/regionalPrevention/icon-bridge.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: {
                  ...item,
                  address: item.address,
                  img: item.photoUrl || '',
                  name: item.safetyLocationName
                },
                visible: false
              }
            }
          )
        }
      })
    },
    closeIcon () {
      this.markList.hospitalList.forEach(item => {
        item.hide()
      })
      this.markList.bridgeList.forEach(item => {
        item.hide()
      })
      this.markList.gasStationList.forEach(item => {
        item.hide()
      })
      this.markList.schoolList.forEach(item => {
        item.hide()
      })
      this.markList.getGasStationList.forEach(item => {
        item.hide()
      })
      this.markList.buildingList.forEach(item => {
        item.hide()
      })
    },
    changeIcon (index) {
      this.closeIcon()
      switch (index) {
        case 0:
          this.markList.schoolList.forEach(item => {
            item.show()
          })
          break
        case 1:
          this.markList.hospitalList.forEach(item => {
            item.show()
          })
          break

        case 2:
          this.markList.getGasStationlList.forEach(item => {
            item.show()
          })
          break

        case 3:
          this.markList.gasStationList.forEach(item => {
            item.show()
          })
          break

        case 4:
          this.markList.buildingList.forEach(item => {
            item.show()
          })
          break

        case 5:
          this.markList.bridgeList.forEach(item => {
            item.show()
          })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
