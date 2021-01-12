<template>
  <div class="page-container">
    <SimpleMap @mapInit="mapInit">
      <ToolSelector
        @bindToolBtn="bindToolBtn"
      />
      <div class="right-bottom">
        <div
          :class="{'right-bottom-select': selected_one }"
          @click="change(1)"
        >
          雪亮工程
        </div>
        <div
          :class="{'right-bottom-select': selected_four }"
          @click="change(4)"
        >
          高空摄像机
        </div>
        <div
          :class="{'right-bottom-select': selected_two }"
          @click="change(2)"
        >
          无人机
        </div>
        <div
          :class="{'right-bottom-select': selected_five }"
          @click="change(5)"
        >
          指挥车
        </div>
        <div
          :class="{'right-bottom-select': selected_three }"
          @click="change(3)"
        >
          网格员
        </div>
      </div>

      <template v-if="selected_three">
        <el-amap-marker
          v-for="item in onlineList"
          :key="item.id"
          :vid="item.id"
          :position="[item.lon, item.lat]"
          :offset="[-12, -10]"
          :top-when-click="true"
        >
          <div style="color:#fff;margin-bottom:4px;min-width:30px;">
            {{ item.nickName }}
          </div>
          <img
            style="width: 30px"
            src="@/assets/images/commandAndDispatch/safe/safe.png"
            @click="openDeviceModal(item)"
          >
        </el-amap-marker>
      </template>
      <template v-if="selected_one">
        <el-amap-marker
          v-for="item in needZdfxList"
          :key="item.id + 'z'"
          :vid="item.id"
          :position="[item.longitude, item.latitude]"
          :offset="[-27, -40]"
          :top-when-click="true"
        >
          <div
            class="eventMarker"
            :class="focusingId === item.id && 'twinkle'"
            @click="showEventDetail1(item)"
          >
            <!-- <p>主动发现</p> -->
            <img src="@/assets/images/commandAndDispatch/safe/marker-icon.png">
          </div>
        </el-amap-marker>
      </template>
      <template v-if="!selected_two">
        <el-amap-marker
          v-for="item in needQzsbList"
          :key="item.id + 'q'"
          :vid="item.id"
          :position="[item.longitude, item.latitude]"
          :offset="[-27, -40]"
          :top-when-click="true"
        >
          <div
            class="eventMarker"
            :class="focusingId === item.id && 'twinkle'"
            @click="showEventDetail1(item)"
          >
            <!-- <p>群众上报</p> -->
            <img src="@/assets/images/commandAndDispatch/event/marker-icon.png">
          </div>
        </el-amap-marker>
      </template>
      <template v-if="!selected_three">
        <el-amap-marker
          v-for="item in needDbxbList"
          :key="item.id + 'd'"
          :vid="item.id"
          :position="[item.longitude, item.latitude]"
          :offset="[-27, -40]"
          :top-when-click="true"
        >
          <div
            class="eventMarker"
            :class="focusingId === item.id && 'twinkle'"
            @click="showEventDetail1(item)"
          >
            <p>督办协办</p>
            <img src="@/assets/images/commandAndDispatch/event/marker-icon.png">
          </div>
        </el-amap-marker>
      </template>

      <el-amap-marker
        v-for="item in renderList"
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

      <el-amap-info-window
        v-if="infoWindowData"
        :auto-move="true"
        :show-shadow="true"
        :position="[infoWindowData.lon, infoWindowData.lat]"
        :events="infoWindowEvents"
        :is-custom="true"
        :offset="[850, -120]"
      >
        <!-- 预览图标弹窗 -->
        <div class="model-box">
          <span
            class="close"
            @click="closeModel"
          >X</span>
          <div @click="openOne">
            <img src="@/assets/images/commandAndDispatch/组 74@2x.png">
            <p>单窗口预览</p>
          </div>
          <div @click="openMore">
            <img src="@/assets/images/commandAndDispatch/组 74 拷贝@2x.png">
            <p>多窗格预览</p>
          </div>
        </div>
      </el-amap-info-window>
    </SimpleMap>

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <Statistics />
        <Rank />
        <Search
          :department-list="departmentList"
          @peopleRow="peopleRow"
        />
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <!-- <EventInfo @focusEvent="focusEvent" /> -->
        <EventInfo
          @focusEvent="focusEvent"
          @todetails="todetails"
        />
        <RealTimeVideo @showVideo="showVideo" />
      </div>
    </transition>
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
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

    <!-- 单个预览视频窗 -->
    <SingleVideoDialog
      v-drag
      title="萍乡市安源区遵义路98号"
      :one-model-status="oneModelStatus"
      @closeOneModel="closeOneModel"
    />

    <!-- 多个预览视频窗 -->
    <div
      v-if="moreVideoList.length>0"
      class="model-more-box"
    >
      <div
        v-for="(item, index) in moreVideoList"
        :key="index"
        class="video"
      >
        <div class="title">
          <span
            class="close"
            @click="closeMoreModel(index)"
          >X</span>
          <img src="@/assets/images/commandAndDispatch/摄像头.png">
          <span>萍乡868安源杉杉奥特莱斯内东南侧支路</span>
        </div>
        <!-- <IframeVideoPlay :camera-index-code="item.cameraIndexCode" /> -->
        <!-- <IframeVideoPlay :url="require(`@/assets/videos/${item.id}.mp4`)" /> -->
        <video
          class="video-box"
          width="100%"
          height="223px"
          autoplay
          loop
          :src="require(`@/assets/videos/${item.id}.mp4`)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import eventMixin from '../riskPrevention/home/evenModule/eventMixin'
import Statistics from './Statistics'
import Rank from './Rank'
import Search from './Search'
import EventInfo from './EventInfo'
import ToolSelector from './ToolSelector'
import RealTimeVideo from './RealTimeVideo'
import SingleVideoDialog from './SingleVideoDialog'
import { getEventArr } from '@/api/common/event'
import { eventAllLists, departmentList } from './mocks'
import '@/utils/drag'
const enumEventStatus = {
  1: '未受理',
  2: '已派发',
  3: '已处置',
  4: '超时',
  5: '催单',
  6: '已归档'
}
export default {
  components: {
    Statistics,
    Rank,
    Search,
    EventInfo,
    ToolSelector,
    RealTimeVideo,
    SingleVideoDialog
  },
  mixins: [eventMixin],
  data () {
    return {
      departmentList: [],
      selected: [],
      eventAllList: [],
      eventInfo: '',
      modal: '',
      focusingId: '',
      mapRangingTool: null,
      selectedDevices: [],
      modelStatus: false,
      oneModelStatus: false,
      moreVideoList: [
        // {
        //   id: 22,
        //   cameraIndexCode: '36015603001320000845',
        //   positionName: ''
        // },
        // {
        //   id: 21,
        //   cameraIndexCode: '36012120001320000099',
        //   positionName: ''
        // },
        // {
        //   id: 20,
        //   cameraIndexCode: '36015602001320001610',
        //   positionName: ''
        // },
        // {
        //   id: 19,
        //   cameraIndexCode: '36015602001320001774',
        //   positionName: ''
        // },
        // {
        //   id: 18,
        //   cameraIndexCode: '36012102001310993251',
        //   positionName: ''
        // },
        // {
        //   id: 17,
        //   cameraIndexCode: '36015603001320000553',
        //   positionName: ''
        // },
        // {
        //   id: 16,
        //   cameraIndexCode: '36015603001320000845',
        //   positionName: ''
        // },
        // {
        //   id: 15,
        //   cameraIndexCode: '36012120001320000099',
        //   positionName: ''
        // },
        // {
        //   id: 14,
        //   cameraIndexCode: '36012102001310993251',
        //   positionName: ''
        // }
      ],
      num: 1,
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
        }
      },
      selected_one: false,
      selected_two: false,
      selected_three: false,
      selected_four: false,
      selected_five: false,
      renderList: [],
      searchForm: {
        status: '',
        eventName: '',
        excludeEventCodeList: 'supervise'
      },
      list: []
    }
  },
  computed: {
    onlineList () {
      return this.departmentList.filter(item => item.isOnline)
    },
    sbgzList () {
      return this.eventAllList.filter(
        event => event.source === 'DEVICE_AWARENESS'
      )
    },
    zdfxList () {
      return this.eventAllList.filter(
        event => event.source === 'ACTIVE_DISCOVERY'
      )
    },
    qzsbList () {
      return this.eventAllList.filter(event => event.source === 'MASS_REPORT')
    },
    dbxbList () {
      return this.eventAllList.filter(
        event => event.source === 'SUPERVISORY_CO_ORGANIZER'
      )
    },
    needSbgzList () {
      return this.sbgzList.filter(event => event.isShow)
    },
    needZdfxList () {
      return this.zdfxList.filter(event => event.isShow)
    },
    needQzsbList () {
      return this.qzsbList.filter(event => event.isShow)
    },
    needDbxbList () {
      return this.dbxbList.filter(event => event.isShow)
    }
  },
  mounted () {
    this.selected = ['设备感知', '群众上报', '督办协办', '主动发现']
    this.getAllEventList()
    this.getAllEventLists()
    // getDepartmentList().then(res => {
    //   this.departmentList = res.datas
    //   console.log(JSON.stringify(this.departmentList))
    // })
    console.log(this.renderList)
    this.departmentList = departmentList
  },
  methods: {
    getAllEventLists () {
      getEventArr(this.searchForm).then(res => {
        this.list = res.data
          .filter(
            item =>
              item.longitude &&
              item.latitude &&
              item.statusText !== '已处置' &&
              item.statusText !== '已归档' &&
              item.peopleLabel !== '退役人员'
          )
          .map((item, index) => {
            return {
              ...item,
              status: enumEventStatus[item.status],
              name: item.eventName,
              date: item.happenedTime,
              peopleName: item.peopleName,
              peopleLabel: item.peopleLabel,
              detail: item.eventName + '预警，请及时处理！',
              address: item.location,
              position: [item.longitude, item.latitude],
              source: item.source,
              longitude: item.longitude,
              latitude: item.latitude,
              id: item.id,
              snapImageUrl: item.snapImageUrl
            }
          })
        this.list = this.list.slice(0, 10)
        this.renderList = toRepeat(this.list, 'deviceSerialNo')
        function toRepeat (arr, key) {
          const res = new Map()
          return arr.filter(
            list => !res.has(list[key]) && res.set(list[key], 1)
          )
        }
      })
    },
    mapInit (map) {
      this.map = map
      this.map.setCenter([113.915745, 27.637577])
      this.map.setZoom(12.8)

      // 路径UI组件 初始化
      window.AMapUI.load(['ui/misc/PathSimplifier'], PathSimplifier => {
        if (!PathSimplifier.supportCanvas) {
          return alert('当前环境不支持 Canvas！')
        }

        this.pathSimplifier = new PathSimplifier({
          zIndex: 100,
          autoSetFitView: false,
          map: this.map,
          getPath: function (pathData) {
            return pathData.path
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: -1, // 绘制路线节点，如不需要可设置为-1
            eventSupport: false,
            pathNavigatorStyle: {
              lineWidth: 1,
              borderWidth: 1
            }
          }
        })
      })

      // 画图工具逐渐 初始化
      this.mapMouseTool = new window.AMap.MouseTool(map)
      this.mapMouseTool.on('draw', e => {
        const obj = e.obj
        if (
          obj.CLASS_NAME === 'AMap.Polygon' ||
          obj.CLASS_NAME === 'AMap.Circle'
        ) {
          this.selectedDevices = this.onlineList.filter(device =>
            obj.contains([device.lon, device.lat])
          )
          if (this.selectedDevices.length > 0) {
            this.modal = 'device'
          }
          this.isDrawing = false
          this.mapMouseTool.close(true)
        }
      })

      // 测距工具 初始化
      this.mapRangingTool = new window.AMap.RangingTool(map)
      this.mapRangingTool.on('end', () => {
        this.mapRangingTool.turnOff()
      })

      // 从事件处置页面跳转到此页，聚焦当前事件
      if (this.$route.query.longitude && this.$route.query.latitude) {
        this.map.setCenter([
          Number(this.$route.query.longitude),
          Number(this.$route.query.latitude)
        ])
        this.map.setZoom(32)
      }
    },
    focusEvent (item) {
      if (item.position.length && item.position[0] && item.position[1]) {
        if (item.source === 'ACTIVE_DISCOVERY') {
          this._eventMarkIsShow(this.zdfxList, item)
        } else if (item.source === 'MASS_REPORT') {
          this._eventMarkIsShow(this.qzsbList, item)
        } else if (item.source === 'SUPERVISORY_CO_ORGANIZER') {
          this._eventMarkIsShow(this.dbxbList, item)
        } else if (item.source === 'DEVICE_AWARENESS') {
          this._eventMarkIsShow(this.sbgzList, item)
        }

        // 刷新动画
        this.focusingId = null
        setTimeout(() => {
          this.focusingId = item.id
        }, 0)

        this.map.setCenter(item.position)
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    },
    _eventMarkIsShow (list, focusItem) {
      list.forEach(event => {
        if (
          Math.abs(event.longitude - focusItem.longitude) < 0.00008 &&
          Math.abs(event.latitude - focusItem.latitude) < 0.00008 &&
          focusItem.id !== event.id
        ) {
          event.isShow = false
        } else {
          event.isShow = true
        }
      })
    },
    async getAllEventList () {
      // const { data } = await getEventArr()
      // this.eventAllList = data.filter((item, index) => {
      //   item.isShow = true
      //   return item.longitude && item.latitude
      // })
      // console.log(JSON.stringify(this.eventAllList))
      // this.eventAllList = this.eventAllList.slice(0, 50)
      this.eventAllList = eventAllLists
    },
    // 激活事件详情弹框
    showEventDetail1 (info) {
      this.eventInfo = info
      this.infoWindowData = {
        lon: info.longitude,
        lat: info.latitude
      }
    },
    closeModel () {
      this.infoWindowData = null
    },
    openOne () {
      this.infoWindowData = null
      this.oneModelStatus = true
    },
    closeOneModel () {
      this.oneModelStatus = false
    },
    openMore () {
      this.infoWindowData = null
      this.moreVideoList.push(
        {
          id: this.num,
          cameraIndexCode: '36015603001320000845',
          positionName: ''
        }
      )
      this.num++
    },
    closeMoreModel (index) {
      this.moreVideoList.splice(index, 1)
    },
    change (val) {
      if (val === 1) {
        this.selected_one = !this.selected_one
      } else if (val === 2) {
        this.selected_two = !this.selected_two
      } else if (val === 3) {
        this.selected_three = !this.selected_three
      } else if (val === 4) {
        this.selected_four = !this.selected_four
      } else if (val === 5) {
        this.selected_five = !this.selected_five
      }
    },
    bindToolBtn (type) {
      switch (type) {
        case 'rectangle':
          this.drawRectangle()
          break
        case 'circle':
          this.drawCircle()
          break
        case 'polygon':
          this.drawPolygon()
          break
        case 'distance':
          this.mapRangingTool.turnOn()
          this.isDrawing = true
          break
        default:
          break
      }
    },
    drawRectangle () {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.rectangle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillOpacity: 0.5,
        strokeStyle: 'solid'
      })
    },
    drawCircle () {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.circle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    },
    drawPolygon () {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.polygon({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    },
    peopleRow (item) {
      this.map.setCenter([item.lon, item.lat])
      this.map.setZoom(20)
    },
    showVideo (id) {
      let status = null
      this.moreVideoList.map((value, index) => {
        if (value.id === id) {
          status = true
        }
      })
      if (status) {
        this.$message.warning('该视频已在预览窗格中！')
        return
      }
      this.moreVideoList.push(
        {
          id: id,
          cameraIndexCode: '36015603001320000845',
          positionName: ''
        }
      )
    },
    openDeviceModal (device) {
      this.map.setCenter([device.lon, device.lat])
      this.map.setZoom(15)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  .left {
    width: 82px;
    margin-left: 85px;
    .item {
      width: 82px;
      height: 82px;
      background: url('~@/assets/images/commandAndDispatch/total-bg.png');
      color: #00ffff;
      text-align: center;
      .dd {
        font-size: 16px;
        padding-top: 20px;
      }
      .dt {
        font-size: 12px;
      }
    }
  }
  .right {
    margin-left: 65px;
    padding: 9px 0;
    box-sizing: border-box;
    p {
      font-size: 12px;
      color: #fff;
      border-left: 1px solid #ff5546;
      padding-left: 9px;
      span {
        color: #00ffff;
        margin-left: 23px;
      }
    }
  }
}
.eventMarker {
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  p {
    background: url("~@/assets/images/commandAndDispatch/safe/marker-bg.png") no-repeat 100% 100%;
    margin: 0 0 4px 0;
    padding: 3px 6px;
    word-wrap: none;
    word-break: keep-all;
  }
  img {
    width: 30px;
  }
}
.model-box {
  position: absolute;
  left: 45%;
  top: 45%;
  width: 192px;
  height: 81px;
  z-index: 999999;
  background: url("~@/assets/images/commandAndDispatch/矩形 599@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  div {
    display: inline-block;
    width: 49%;
    padding-top: 10px;
    text-align: center;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }
    p {
      margin: 0;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #A1D8FF;
      line-height: 28px;

    }
  }

  .close {
    position: absolute;
    right: 10px;
    top: 5px;
    color: #00A2FF;
    cursor: pointer;
  }
}

.model-more-box {
  position: absolute;
  left: 22.5%;
  top: 12%;
  min-width: 35%;
  max-width: 55%;
  max-height: 750px;
  pointer-events: none;

  .video {
    position: relative;
    display: inline-block;
    margin: 5px;
    width: 340px;
    height: 223px;
    padding: 15px;
    background: url("~@/assets/images/commandAndDispatch/视频框@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    pointer-events: auto;
    .title {
      position: absolute;
      top: 10px;
      left: 20px;
      img {
        width: 18px;
        height: 16px;
        vertical-align: top;
      }
      span {
        color: #ffffff;
      }
    }
  }
  .close {
    position: absolute;
    right: -35px;
    top: 0px;
    width: 20px;
    height: 20px;
    z-index: 99;
    color: #00A2FF;
    cursor: pointer;
  }
}
.right-bottom {
  position: absolute;
  right: 23%;
  top: 8%;
  width: 116px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #A4CFFF;
  line-height: 28px;

  div {
    width: 100%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    margin-bottom: 10px;
    cursor: pointer;
    background: url("~@/assets/images/commandAndDispatch/组 12 拷贝 11@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .right-bottom-select {
    background: url("~@/assets/images/commandAndDispatch/组 12 拷贝 11@2x (1).png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}

</style>
